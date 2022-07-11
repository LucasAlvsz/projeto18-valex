import { Request, Response } from "express"
import rechargeCardService from "../services/rechargeService"

export const rechargeCard = async (req: Request, res: Response) => {
	const { number, name, expirationDate, amount } = req.body as {
		number: string
		name: string
		expirationDate: string
		amount: number
	}
	const { "x-api-key": apiKey } = req.headers as { "x-api-key": string }

	const { id: cardId } =
		await rechargeCardService.validateEligibilityToRechargeCard(
			number,
			name,
			expirationDate,
			apiKey
		)
	await rechargeCardService.persistCardRechargeInDatabase(cardId, amount)

	res.sendStatus(200)
}
