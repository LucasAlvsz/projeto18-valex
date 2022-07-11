import * as rechargeRepository from "../repositories/rechargeRepository"
import validateService from "./validateService"
import { unauthorizedError } from "../utils/errors"

const validateEligibilityToRechargeCard = async (
	number: string,
	name: string,
	expirationDate: string,
	apiKey: string
) => {
	await validateService.validateApiKey(apiKey)

	const cardData = await validateService.validateCardByDetails(
		number,
		name,
		expirationDate
	)
	const { password } = cardData
	validateService.validateExpirationDate(expirationDate)
	if (!password) throw unauthorizedError("Card is not activated")
	return cardData
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

const rechargeCardService = {
	validateEligibilityToRechargeCard,
	persistCardRechargeInDatabase,
}

export default rechargeCardService
