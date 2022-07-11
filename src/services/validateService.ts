import * as companyRepository from "../repositories/companyRepository"
import * as cardRepository from "../repositories/cardRepository"
import { compareDates } from "../utils/dataFormatter"
import { unauthorizedError, notFoundError } from "../utils/errors"

const validateApiKey = async (apiKey: string) => {
	const validApiKey = await companyRepository.findByApiKey(apiKey)
	if (!validApiKey) throw unauthorizedError("Invalid API key")
	return validApiKey
}

const validateExpirationDate = (expirationDate: string) => {
	if (compareDates(new Date(), expirationDate) === "after")
		throw unauthorizedError("Card expired")
}

const validateCardById = async (cardId: number) => {
	const card = await cardRepository.findById(cardId)
	if (!card) throw notFoundError("Card not found")
	return card
}

const validateCardByDetails = async (
	number: string,
	cardholderName: string,
	expirationDate: string
) => {
	const cardData = await cardRepository.findByCardDetails(
		number,
		cardholderName,
		expirationDate
	)
	if (!cardData) throw notFoundError("Card not found")
	return cardData
}

const validateService = {
	validateApiKey,
	validateCardById,
	validateCardByDetails,
	validateExpirationDate,
}

export default validateService
