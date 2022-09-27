import { Request, Response } from "express"
import cardService from "../services/cardService"
import { TransactionTypes } from "../repositories/cardRepository"

export const createCard = async (req: Request, res: Response) => {
	const { type } = req.body as { type: TransactionTypes }
	const { employeeId } = req.params as { employeeId: any }
	const { "x-api-key": apiKey } = req.headers as { "x-api-key": string }

	const cardData = await cardService.createCard(employeeId, type, apiKey)

	res.status(201).send(cardData)
}

export interface cardIdentifier {
	number: string
	name: string
	expirationDate: string
}

type ActivateCardBody = cardIdentifier & { password: string; cvc: string }
type BlockCardBody = Omit<ActivateCardBody, "cvc">
type UnblockCardBody = BlockCardBody

export const activateCard = async (req: Request, res: Response) => {
	const { number, name, expirationDate, password, cvc }: ActivateCardBody = req.body

	await cardService.activateCard(number, name, expirationDate, password, cvc)

	res.sendStatus(200)
}

export const blockCard = async (req: Request, res: Response) => {
	const { number, name, expirationDate, password }: BlockCardBody = req.body

	await cardService.blockCard(number, name, expirationDate, password)

	res.sendStatus(200)
}

export const unblockCard = async (req: Request, res: Response) => {
	const { number, name, expirationDate, password }: UnblockCardBody = req.body

	await cardService.unblockCard(number, name, expirationDate, password)

	res.sendStatus(200)
}

export const getCardStatements = async (req: Request, res: Response) => {
	const { id } = req.params
	const formattedStatementsData = await cardService.getCardStatements(parseInt(id))
	res.status(200).send(formattedStatementsData)
}
