import { Request, Response } from "express"
import paymentService from "../services/paymentService"
import { cardIdentifier } from "./cardController"

type paymentAtPointOfSaleBody = cardIdentifier & {
	password: string
	amount: number
}

export const paymentAtPointOfSale = async (req: Request, res: Response) => {
	const {
		number,
		name,
		expirationDate,
		password,
		amount,
	}: paymentAtPointOfSaleBody = req.body
	const { businessId } = req.params as { businessId: any }

	await paymentService.paymentAtPointOfSale(
		number,
		name,
		expirationDate,
		password,
		businessId,
		amount
	)

	res.sendStatus(200)
}
