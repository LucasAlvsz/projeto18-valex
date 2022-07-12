import * as rechargeRepository from "../repositories/rechargeRepository"
import validateService from "./validateService"
import { unauthorizedError } from "../utils/errorsUtils"
import nameFormatter from "../utils/nameFormatterUtils"

const rechargeCard = async (
	number: string,
	name: string,
	expirationDate: string,
	apiKey: string,
	amount: number
) => {
	const { id: cardId } = await validateEligibilityToRechargeCard(
		number,
		name,
		expirationDate,
		apiKey
	)
	await persistCardRechargeInDatabase(cardId, amount)
}

const validateEligibilityToRechargeCard = async (
	number: string,
	name: string,
	expirationDate: string,
	apiKey: string
) => {
	await validateService.validateApiKey(apiKey)
	const cardholderName = nameFormatter(name)
	const cardData = await validateService.validateCardByDetails(
		number,
		cardholderName,
		expirationDate
	)
	const { password } = cardData
	validateService.validateExpirationDate(expirationDate)
	if (!password) throw unauthorizedError("Card is not activated")
	return cardData
}

const getRechargesByCardId = async (cardId: number) => {
	await validateService.validateCardById(cardId)
	const recharges = await rechargeRepository.findByCardId(cardId)
	return recharges
}

const persistCardRechargeInDatabase = async (
	cardId: number,
	amount: number
) => {
	const rechargeData = {
		cardId,
		amount: amount,
	}
	await rechargeRepository.insert(rechargeData)
}

const rechargeService = {
	rechargeCard,
	getRechargesByCardId,
}

export default rechargeService
