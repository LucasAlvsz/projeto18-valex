import {
	notFoundError,
	unauthorizedError,
	conflictError,
} from "../utils/errorsUtils"

import * as employeeRepository from "../repositories/employeeRepository"
import * as cardRepository from "../repositories/cardRepository"

import validateService from "./validateService"

import {
	TransactionTypes,
	CardInsertData,
} from "../repositories/cardRepository"

import { getFormattedDate } from "../utils/dateFormatterUtils"
import { encrypt, decrypt } from "../utils/cryptographyUtils"
import nameFormatter from "../utils/nameFormatterUtils"
import getAmount from "../utils/getAmountUtils"
import {
	createCardNumber,
	createExpirationDate,
	createSecurityCode,
} from "../utils/cardMockUtils"
import paymentService from "./paymentService"
import rechargeService from "./rechargeService"

export type cardOperation = "unblock" | "block"

const createCard = async (
	employeeId: number,
	type: TransactionTypes,
	apiKey: string
) => {
	const name = await validateEligibilityForCreation(employeeId, type, apiKey)
	const cardData = generateCardData(name, employeeId, type)
	await persistCardInDatabase(cardData)
	delete cardData.employeeId
	cardData["cvc"] = cardData["securityCode"]
	return cardData
}

const activateCard = async (
	number: string,
	name: string,
	expirationDate: string,
	password: string,
	cvc: string
) => {
	const { id: cardId } = await validateEligibilityForActivation(
		number,
		name,
		expirationDate,
		cvc
	)
	await persistActivationInDatabase(cardId, password)
}

const blockCard = async (
	number: string,
	name: string,
	expirationDate: string,
	password: string
) => {
	const { id: cardId } = await validateEligibilityForBlockingOrUnblocking(
		number,
		name,
		expirationDate,
		password,
		"block"
	)
	await persistLockInDatabase(cardId)
}

const unblockCard = async (
	number: string,
	name: string,
	expirationDate: string,
	password: string
) => {
	const { id: cardId } = await validateEligibilityForBlockingOrUnblocking(
		number,
		name,
		expirationDate,
		password,
		"unblock"
	)
	persistUnlockInDatabase(cardId)
}

const getCardStatements = async (
	number: string,
	name: string,
	expirationDate: string
) => {
	const { id: cardId } = await validateService.validateCardByDetails(
		number,
		nameFormatter(name),
		expirationDate
	)
	const transactions = await paymentService.getTransactionsByCardId(cardId)
	const recharges = await rechargeService.getRechargesByCardId(cardId)
	const balance = getBalance(transactions, recharges)
	const formattedStatementsData = cardService.getformattedStatementsData(
		recharges,
		transactions,
		balance
	)
	return formattedStatementsData
}

const generateCardData = (
	name: string,
	employeeId: number,
	type: TransactionTypes
): CardInsertData => {
	const cardNumber = createCardNumber()
	const cardholderName = nameFormatter(name)
	const expirationDate = createExpirationDate()
	const securityCode = createSecurityCode()
	return {
		number: cardNumber,
		employeeId,
		cardholderName,
		securityCode,
		expirationDate,
		isVirtual: false,
		isBlocked: false,
		type,
	}
}

const getformattedStatementsData = (
	rechargeData: object[],
	transactions: object[],
	balance: number
) => {
	const formattedRecharges = getFormattedDate(
		rechargeData,
		"timestamp",
		"DD/MM/YYYY"
	)
	const formattedTransactions = getFormattedDate(
		transactions,
		"timestamp",
		"DD/MM/YYYY"
	)
	const formattedStatementsData = {
		balance,
		transactions: formattedTransactions,
		recharges: formattedRecharges,
	}
	return formattedStatementsData
}

const getBalance = (transactions: object[], recharges: object[]) => {
	return getAmount(recharges, "amount") - getAmount(transactions, "amount")
}

const validateUniqueTypeCard = async (
	type: TransactionTypes,
	employeeId: number
) => {
	const card = await cardRepository.findByTypeAndEmployeeId(type, employeeId)
	if (card)
		throw conflictError(`${type} card already exists for this employee`)
}

const validateEmployee = async (employeeId: number) => {
	const employee = await employeeRepository.findById(employeeId)
	if (!employee) throw notFoundError("Employee not found")
	return employee
}

const validateEligibilityForCreation = async (
	employeeId: number,
	type: TransactionTypes,
	apiKey: string
) => {
	const { id } = await validateService.validateApiKey(apiKey)
	const { companyId, fullName } = await validateEmployee(employeeId)
	if (companyId !== id)
		throw unauthorizedError("User does not belong to this company")
	await validateUniqueTypeCard(type, employeeId)
	return fullName
}

const validateEligibilityForActivation = async (
	number: string,
	name: string,
	expirationDate: string,
	cvc: string
) => {
	const cardholderName = nameFormatter(name)
	const cardData = await validateService.validateCardByDetails(
		number,
		cardholderName,
		expirationDate
	)
	const { securityCode, password } = cardData
	if (password) throw conflictError("Card is already activated")
	validateService.validateExpirationDate(expirationDate)
	validateSecurityCode(securityCode, cvc)
	return cardData
}

const validateEligibilityForBlockingOrUnblocking = async (
	number: string,
	name: string,
	expirationDate: string,
	password: string,
	operation: cardOperation
) => {
	const cardholderName = nameFormatter(name)
	const cardData = await validateService.validateCardByDetails(
		number,
		cardholderName,
		expirationDate
	)
	const { password: storagePassword, isBlocked } = cardData

	if (!storagePassword) throw unauthorizedError("Card is not activated")
	validateService.validateExpirationDate(expirationDate)
	validateService.validatePassword(storagePassword, password)
	if (isBlocked && operation === "block")
		throw conflictError("Card is already blocked")
	if (!isBlocked && operation === "unblock")
		throw conflictError("Card is already unblocked")
	return cardData
}

const validateSecurityCode = (encryptedSecurityCode: string, cvc: string) => {
	const decryptedSecurityCode = decrypt(encryptedSecurityCode)
	if (decryptedSecurityCode !== cvc) throw unauthorizedError("Invalid CVC")
}

const persistCardInDatabase = async (cardData: CardInsertData) => {
	cardData = { ...cardData, securityCode: encrypt(cardData.securityCode) }
	await cardRepository.insert(cardData)
}

const persistActivationInDatabase = async (
	cardId: number,
	password: string
) => {
	const cardDataUpdate = {
		isBlocked: false,
		password: encrypt(password),
	}
	await cardRepository.update(cardId, cardDataUpdate)
}

const persistLockInDatabase = async (cardId: number) => {
	const cardDataUpdate = {
		isBlocked: true,
	}
	await cardRepository.update(cardId, cardDataUpdate)
}

const persistUnlockInDatabase = async (cardId: number) => {
	const cardDataUpdate = {
		isBlocked: false,
	}
	await cardRepository.update(cardId, cardDataUpdate)
}

const cardService = {
	createCard,
	activateCard,
	blockCard,
	unblockCard,
	getCardStatements,
	getBalance,
	getformattedStatementsData,
}

export default cardService
