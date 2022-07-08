import dotenv from "dotenv"
import pg from "pg"
dotenv.config()

const { Pool } = pg
const db = new Pool({
	connectionString: process.env.DATABASE_URL,
})

export default db
