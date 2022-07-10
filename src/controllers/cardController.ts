import { Request, Response } from "express"
import cardService from "../services/cardService"

export const createCard = async (req: Request, res: Response) => {
	const { type } = req.body
	const { employeeId } = req.params as { employeeId: any }
	const { "x-api-key": apiKey } = req.headers as { "x-api-key": string }
	await cardService.createCard(type, employeeId, apiKey)
	res.sendStatus(201)
}

export const activateCard = async (req: Request, res: Response) => {
	const { cardId } = req.params as { cardId: any }
	const { password, cvc } = req.body as { password: string; cvc: string }
	await cardService.activateCard(cardId, password, cvc)
	res.sendStatus(200)
}

export const blockCard = async (req: Request, res: Response) => {
	const { cardId } = req.params as { cardId: any }
	const { password } = req.body as { password: string }
	await cardService.blockCard(cardId, password)
	res.sendStatus(200)
}

export const unblockCard = async (req: Request, res: Response) => {
	const { cardId } = req.params as { cardId: any }
	const { password } = req.body as { password: string }
	await cardService.unblockCard(cardId, password)
	res.sendStatus(200)
}

export const getCardStatements = (req: Request, res: Response) => {
	const { cardId } = req.params as { cardId: any }
	const { password } = req.body as { password: string }
	return cardService.getCardStatements(cardId, password)
}
