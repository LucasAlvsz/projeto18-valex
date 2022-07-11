import { Request, Response } from "express"
import rechargeCardService from "../services/rechargeService"

export const rechargeCard = async (req: Request, res: Response) => {
	const { cardId } = req.params as { cardId: any }
	const { amount } = req.body as { amount: number }
	const { "x-api-key": apiKey } = req.headers as { "x-api-key": string }

	await rechargeCardService.rechargeCard(cardId, apiKey, amount)

	res.sendStatus(200)
}
