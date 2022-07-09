import pg from "pg"

const { Pool } = pg
const db = new Pool({
	connectionString: process.env.DATABASE_URL,
	...(process.env.PROD_MODE && {
		ssl: { rejectUnauthorized: false },
	}),
})

export default db
