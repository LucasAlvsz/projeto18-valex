import { Request, Response } from "express"
import rechargeCardService from "../services/rechargeService"
import { cardIdentifier } from "./cardController"

type rechargeCardBody = cardIdentifier & { amount: number }

export const rechargeCard = async (req: Request, res: Response) => {
	const { number, name, expirationDate, amount }: rechargeCardBody = req.body
	const { "x-api-key": apiKey } = req.headers as { "x-api-key": string }

	await rechargeCardService.rechargeCard(
		number,
		name,
		expirationDate,
		apiKey,
		amount
	)

	res.sendStatus(200)
}
