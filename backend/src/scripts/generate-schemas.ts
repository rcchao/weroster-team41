#!/usr/bin/env node

/**
 * Script to generate schemas.json from ALL TypeScript types in the types folder
 * This will create a schemas.json file that your swagger.ts can use
 *
 * Usage:
 *   npm install -D typescript-json-schema
 *   npm run generate-schemas
 */

import { exec } from "child_process"
import fs from "fs"
import path from "path"
import process from "process"
import { promisify } from "util"

const execAsync = promisify(exec)

interface JSONSchema {
  $schema?: string
  definitions?: Record<string, JSONSchemaDefinition>
  [key: string]: unknown
}

interface JSONSchemaDefinition {
  type?: string
  format?: string
  properties?: Record<string, JSONSchemaProperty>
  anyOf?: JSONSchemaProperty[]
  [key: string]: unknown
}

interface JSONSchemaProperty {
  type?: string
  format?: string
  anyOf?: JSONSchemaProperty[]
  nullable?: boolean
  [key: string]: unknown
}

export const generateSchemas = async (): Promise<void> => {
  const typesDir = path.join(__dirname, "../types")
  const outputPath = path.join(__dirname, "../../schemas.json")

  // Check if types directory exists
  if (!fs.existsSync(typesDir)) {
    console.error("❌ Types directory not found:", typesDir)
    process.exit(1)
  }

  // Get all .ts files in the types directory
  const typeFiles = fs
    .readdirSync(typesDir)
    .filter((file) => file.endsWith(".ts"))
    .map((file) => path.join(typesDir, file))

  if (typeFiles.length === 0) {
    console.error("❌ No TypeScript files found in types directory")
    process.exit(1)
  }

  console.log("🔧 Generating schemas from TypeScript types...")
  console.log(`📁 Found ${typeFiles.length} type files:`)
  typeFiles.forEach((file) => console.log(`   - ${path.basename(file)}`))
  console.log(`📦 Output: ${outputPath}`)

  const typesPattern = path.join(typesDir, "*.ts")
  const command = `npx typescript-json-schema "${typesPattern}" "*" --required --strictNullChecks --out ${outputPath}`

  try {
    await execAsync(command)
    console.log("✅ Schemas generated successfully!")
    postProcessSchemas(outputPath)
  } catch (error) {
    console.error("❌ Error generating schemas:", error)

    console.log("💡 Trying alternative approach: generating schemas file by file...")
    const tsConfigPath = path.join(__dirname, "../../tsconfig.json")
    const altCommand = `npx typescript-json-schema ${tsConfigPath} "*" --include="${typesDir}/**/*.ts" --out ${outputPath} --required --strictNullChecks`

    try {
      await execAsync(altCommand)
      console.log("✅ Schemas generated successfully using alternative approach!")
      postProcessSchemas(outputPath)
    } catch (altError) {
      console.error("❌ Alternative approach also failed:", altError)

      // Final fallback: create an empty schemas.json
      const fallbackSchemas: JSONSchema = { definitions: {} }
      fs.writeFileSync(outputPath, JSON.stringify(fallbackSchemas, null, 2))
      console.log("⚠️  Created empty schemas.json as fallback")
      console.log("💡 To manually generate schemas from TypeScript types:")
      console.log(
        '   npx typescript-json-schema tsconfig.json "*" --include="src/types/**/*.ts" --out schemas.json --required --strictNullChecks',
      )
    }
  }
}

const postProcessSchemas = (outputPath: string): void => {
  try {
    const fileContent = fs.readFileSync(outputPath, "utf8")
    const schemas: JSONSchema = JSON.parse(fileContent)

    if (schemas.definitions) {
      const definitions = schemas.definitions
      console.log(`📋 Processing ${Object.keys(definitions).length} schema definitions...`)

      Object.entries(definitions).forEach(([key, schema]) => {
        if (schema.properties) {
          Object.entries(schema.properties).forEach(([propName, property]) => {
            if (
              property.type === "string" &&
              (propName.toLowerCase().includes("time") ||
                propName.toLowerCase().includes("date") ||
                propName.toLowerCase().includes("_at"))
            ) {
              property.format = "date-time"
            }

            if (property.anyOf) {
              const nonNullTypes = property.anyOf.filter((t) => t.type !== "null")
              if (nonNullTypes.length === 1) {
                Object.assign(property, nonNullTypes[0])
                property.nullable = true
                delete property.anyOf
              }
            }
          })
        }

        delete schema.$schema
      })

      console.log("📝 Generated schemas for:")
      Object.keys(definitions).forEach((key) => console.log(`   - ${key}`))
    }

    fs.writeFileSync(outputPath, JSON.stringify(schemas, null, 2))
    console.log("✨ Schemas post-processed for Swagger compatibility")
    console.log(
      `✅ Successfully generated schemas.json with ${Object.keys(schemas.definitions || {}).length} definitions`,
    )
  } catch (e) {
    const err = e as Error
    console.warn("⚠️  Could not post-process schemas:", err.message)
  }
}

// Run if called directly
if (require.main === module) {
  generateSchemas()
}
