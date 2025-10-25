require("dotenv").config()

import express from "express"
import cors from "cors"
import { PrismaClient } from "@prisma/client"
import routes from "./routes"
import { setupSwagger } from "./swagger"

const app = express()
const prisma = new PrismaClient()

app.use(cors())
app.use(express.json())
app.locals.prisma = prisma

app.use("/api", routes)

setupSwagger(app)

app.listen(3000, () => {
  console.log("Server running on port 3000")
})
