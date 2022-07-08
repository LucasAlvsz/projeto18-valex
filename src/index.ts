import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import "dotenv/config"

dotenv.config()

import routes from "./routes/index.js"

const app = express()
app.use(cors())
app.use(express.json())

app.get("/", (req, res) => {
	res.send("Hello World!")
})

app.listen(+process.env.PORT || 5000, () => {
	console.log(`Server running on port ${process.env.PORT || 5000}`)
})
