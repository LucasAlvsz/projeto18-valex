import { decrypt } from "../utils/cryptographyUtils"
import { notFoundError, unauthorizedError } from "../utils/errorsUtils"
import nameFormatter from "../utils/nameFormatterUtils"
import validateService from "./validateService"
import * as businessRepository from "../repositories/businessRepository"
import * as paymentRepository from "../repositories/paymentRepository"

const validateEligibilityForPayment = async (
	number: string,
	name: string,
	expirationDate: string,
	password: string,
	businessId: number
) => {
	const cardholderName = nameFormatter(name)
	const dataCard = await validateService.validateCardByDetails(
		number,
		cardholderName,
		expirationDate
	)
	const { isBlocked, password: storagePassword, type: cardType } = dataCard

	validateService.validateExpirationDate(expirationDate)

	if (!storagePassword) throw unauthorizedError("Card is not activated")
	if (isBlocked) throw unauthorizedError("Card is blocked")
	if (decrypt(storagePassword) !== password)
		throw unauthorizedError("Invalid password")

	const { type: businessType } = await validateBusinessById(businessId)
	if (cardType !== businessType)
		throw unauthorizedError("Invalid card type for this payment")

	return dataCard
}

const validateBusinessById = async (businessId: number) => {
	const businessData = await businessRepository.findById(businessId)
	if (!businessData) throw notFoundError("Business does not exist")
	return businessData
}

const persistPaymentInDatabase = async (
	cardId: number,
	businessId: number,
	amount: number
) => {
	const paymentData = { cardId, businessId, amount }
	await paymentRepository.insert(paymentData)
}

const paymentService = {
	validateEligibilityForPayment,
	persistPaymentInDatabase,
}

export default paymentService
