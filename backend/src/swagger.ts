import swaggerJsdoc from "swagger-jsdoc"
import swaggerUi from "swagger-ui-express"
import fs from "fs"

// Try to load generated schemas if they exist, otherwise use empty object
let generatedSchemas = {}
try {
  const schemas = JSON.parse(fs.readFileSync("./schemas.json", "utf8"))
  generatedSchemas = schemas.definitions || {}
} catch (error) {
  console.log("No generated schemas found, using manual definitions")
}

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Team41 WeRoster API Specification",
      version: "1.0.0",
      description: "API for managing events, shifts, and assignments",
    },
    servers: [
      {
        url: process.env.API_URL || "http://localhost:3000",
        description:
          process.env.NODE_ENV === "production" ? "Production server" : "Development server",
      },
    ],
    components: {
      schemas: generatedSchemas,
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
          description: "Enter your JWT token",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
    tags: [
      {
        name: "Events",
        description: "Event and shift management endpoints",
      },
    ],
  },
  apis: ["./src/routes/**/*.ts"], // JSDoc routes
}

export const swaggerSpec = swaggerJsdoc(options)

export const setupSwagger = (app: any) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec))

  // Also serve the raw swagger.json
  app.get("/swagger.json", (req: any, res: any) => {
    res.setHeader("Content-Type", "application/json")
    res.send(swaggerSpec)
  })
}
