import { Request, Response } from "express"
import cardService from "../services/cardService"

export const createCard = async (req: Request, res: Response) => {
	const { type } = req.body
	const { employeeId } = req.params as { employeeId: any }
	const { "x-api-key": apiKey } = req.headers as { "x-api-key": string }
	const name = await cardService.validateEligibilityForCreation(
		employeeId,
		type,
		apiKey
	)
	const cardData = cardService.generateCardData(name, employeeId, type)
	await cardService.persistCardInDatabase(cardData)
	res.sendStatus(201)
}

export const activateCard = async (req: Request, res: Response) => {
	const { cardId } = req.params as { cardId: any }
	const { password, cvc } = req.body as { password: string; cvc: string }

	await cardService.validateEligibilityForActivation(cardId, cvc)
	await cardService.persistActivationInDatabase(cardId, password)

	res.sendStatus(200)
}

export const blockCard = async (req: Request, res: Response) => {
	const { cardId } = req.params as { cardId: any }
	const { password } = req.body as { password: string }

	await cardService.validateEligibilityForBlockingOrUnblocking(
		cardId,
		password,
		"block"
	)
	await cardService.persistLockInDatabase(cardId)

	res.sendStatus(200)
}

export const unblockCard = async (req: Request, res: Response) => {
	const { cardId } = req.params as { cardId: any }
	const { password } = req.body as { password: string }
	await cardService.validateEligibilityForBlockingOrUnblocking(
		cardId,
		password,
		"unblock"
	)
	cardService.persistUnlockInDatabase(cardId)
	res.sendStatus(200)
}

export const getCardStatements = (req: Request, res: Response) => {
	const { cardId } = req.params as { cardId: any }
	const { password } = req.body as { password: string }
	return cardService.getCardStatements(cardId, password)
}
