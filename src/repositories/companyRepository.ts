import db from "../db/index.js"

export interface Company {
	id: number
	name: string
	apiKey?: string
}

export async function findByApiKey(apiKey: string) {
	const result = await db.query<Company, [string]>(
		`SELECT * FROM companies WHERE "apiKey"=$1`,
		[apiKey]
	)

	return result.rows[0]
}
