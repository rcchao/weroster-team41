import { PrismaClient } from "@prisma/client"
import express from "express"

import eventRoutes from "./routes/event.routes"

const app = express()
const prisma = new PrismaClient()

app.use(express.json())
// Make prisma available to all routes
app.locals.prisma = prisma

app.use("/api/events", eventRoutes)

app.listen(3000)
