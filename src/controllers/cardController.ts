import { Request, Response } from "express"
import cardService from "../services/cardService"

export const createCard = async (req: Request, res: Response) => {
	const { type } = req.body
	const { employeeId } = req.params
	const { "x-api-key": apiKey } = req.headers
	await cardService.createCard(type, parseInt(employeeId), apiKey.toString())
	res.sendStatus(200)
}
