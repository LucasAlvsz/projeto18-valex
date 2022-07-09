import { Request, Response } from "express"
import cardService from "../services/cardService"

export const createCard = async (req: Request, res: Response) => {
	const { type } = req.body
	const { employeeId } = req.params as { employeeId: any }
	const { "x-api-key": apiKey } = req.headers as { "x-api-key": string }
	await cardService.createCard(type, employeeId, apiKey)
	res.sendStatus(200)
}
