import { Request, Response } from "express"
import cardService from "../services/cardService"
import { TransactionTypes } from "../repositories/cardRepository"
import validateService from "../services/validateService"
import paymentService from "../services/paymentService"

export const createCard = async (req: Request, res: Response) => {
	const { type } = req.body as { type: TransactionTypes }
	const { employeeId } = req.params as { employeeId: any }
	const { "x-api-key": apiKey } = req.headers as { "x-api-key": string }

	const name = await cardService.validateEligibilityForCreation(
		employeeId,
		type,
		apiKey
	)
	const cardData = cardService.generateCardData(name, employeeId, type)
	await cardService.persistCardInDatabase(cardData)

	res.status(201).send(cardData) // REFACTOR
}

export const activateCard = async (req: Request, res: Response) => {
	const { number, name, expirationDate, password, cvc } = req.body as {
		number: string
		name: string
		expirationDate: string
		password: string
		cvc: string
	}

	const { id: cardId } = await cardService.validateEligibilityForActivation(
		number,
		name,
		expirationDate,
		cvc
	)
	await cardService.persistActivationInDatabase(cardId, password)

	res.sendStatus(200)
}

export const blockCard = async (req: Request, res: Response) => {
	const { number, name, expirationDate, password } = req.body as {
		number: string
		name: string
		expirationDate: string
		password: string
	}

	const { id: cardId } =
		await cardService.validateEligibilityForBlockingOrUnblocking(
			number,
			name,
			expirationDate,
			password,
			"block"
		)
	await cardService.persistLockInDatabase(cardId)

	res.sendStatus(200)
}

export const unblockCard = async (req: Request, res: Response) => {
	const { number, name, expirationDate, password } = req.body as {
		number: string
		name: string
		expirationDate: string
		password: string
	}

	const { id: cardId } =
		await cardService.validateEligibilityForBlockingOrUnblocking(
			number,
			name,
			expirationDate,
			password,
			"unblock"
		)
	cardService.persistUnlockInDatabase(cardId)

	res.sendStatus(200)
}

export const getCardStatements = async (req: Request, res: Response) => {
	const { number, name, expirationDate } = req.body as {
		number: string
		name: string
		expirationDate: string
	}
	const { id: cardId } = await validateService.validateCardByDetails(
		number,
		name,
		expirationDate
	)
	//const transactions = await
}
