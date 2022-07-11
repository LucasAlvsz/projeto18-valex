import { Request, Response } from "express"
import paymentService from "../services/paymentService"
import cardService from "../services/cardService"
import { unauthorizedError } from "../utils/errorsUtils"

export const paymentAtPointOfSale = async (req: Request, res: Response) => {
	const { number, name, expirationDate, password, amount } = req.body as {
		number: string
		name: string
		expirationDate: string
		password: string
		amount: number
	}
	const { businessId } = req.params as { businessId: any }

	const { id: cardId } = await paymentService.validateEligibilityForPayment(
		number,
		name,
		expirationDate,
		password,
		businessId
	)
	const transactions = await cardService.getTransactionsByCardId(cardId)
	const recharges = await cardService.getRechargesByCardId(cardId)
	const balance = cardService.getBalance(transactions, recharges)
	if (balance < amount) throw unauthorizedError("Insufficient funds")
	await paymentService.persistPaymentInDatabase(cardId, businessId, amount)

	res.sendStatus(200)
}
