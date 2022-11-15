import express from "express"
import cors from "cors"
import "dotenv/config"

import router from "./routes/index"

const app = express()
app.use(cors())
app.use(express.json())
app.use(router)

export default app
