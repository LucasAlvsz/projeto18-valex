import db from "../db/index"

export interface Payment {
	id: number
	cardId: number
	businessId: number
	timestamp: Date
	amount: number
}
export type PaymentWithBusinessName = Payment & { businessName: string }
export type PaymentInsertData = Omit<Payment, "id" | "timestamp">

export async function findByCardId(cardId: number) {
	const result = await db.query<PaymentWithBusinessName, [number]>(
		`SELECT 
      payments.*,
      businesses.name as "businessName"
     FROM payments 
      JOIN businesses ON businesses.id=payments."businessId"
     WHERE "cardId"=$1
    `,
		[cardId]
	)

	return result.rows
}

export async function insert(paymentData: PaymentInsertData) {
	const { cardId, businessId, amount } = paymentData

	db.query<any, [number, number, number]>(
		`INSERT INTO payments ("cardId", "businessId", amount) VALUES ($1, $2, $3)`,
		[cardId, businessId, amount]
	)
}
