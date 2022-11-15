import { Request, Response } from "express"
import paymentService from "../services/paymentService"
import { cardIdentifier } from "./cardController"

type paymentAtPointOfSaleBody = cardIdentifier & {
	password: string
	amount: number
}

export const paymentAtPointOfSale = async (req: Request, res: Response) => {
	const { number, name, expirationDate, password, amount }: paymentAtPointOfSaleBody = req.body
	const { businessId } = req.params

	await paymentService.paymentAtPointOfSale(
		number,
		name,
		expirationDate,
		password,
		parseInt(businessId),
		amount
	)

	res.sendStatus(200)
}
