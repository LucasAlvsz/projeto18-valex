import * as rechargeRepository from "../repositories/rechargeRepository"
import validateService from "./validateService"
import { unauthorizedError } from "../utils/errors"

const validateEligibilityToRechargeCard = async (
	cardId: number,
	apiKey: string
) => {
	await validateService.validateApiKey(apiKey)
	const { expirationDate, password } = await validateService.validateCardId(
		cardId
	)
	validateService.validateExpirationDate(expirationDate)
	if (!password) throw unauthorizedError("Card is not activated")
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
