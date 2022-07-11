import { faker } from "@faker-js/faker"

import {
	notFoundError,
	unauthorizedError,
	conflictError,
} from "../utils/errors"

import * as employeeRepository from "../repositories/employeeRepository"
import * as cardRepository from "../repositories/cardRepository"
import * as paymentRepository from "../repositories/paymentRepository"
import * as rechargeRepository from "../repositories/rechargeRepository"

import validateService from "./validateService"

import {
	TransactionTypes,
	CardInsertData,
} from "../repositories/cardRepository"

import { sumDateWithYear } from "../utils/dataFormatter"
import { encrypt, decrypt } from "../utils/cryptography"

// Magic Numbers
const EXPIRATION_DATE_YEARS = 5

type cardOperation = "unblock" | "block"

const unblockCard = async (cardId: number, password: string) => {
	await validateEligibilityForBlockingOrUnblocking(
		cardId,
		password,
		"unblock"
	)
	persistUnlockInDatabase(cardId)
}

const getCardStatements = async (cardId: number, password: string) => {
	const { id } = await validateService.validateCardId(cardId)
	const transactions = await paymentRepository.findByCardId(cardId)
	const recharges = await rechargeRepository.findByCardId(cardId)
	//const balance = getBalance(transactions, recharges)
}

const validateEmployee = async (employeeId: number) => {
	const employee = await employeeRepository.findById(employeeId)
	if (!employee) throw notFoundError("Employee not found")
	return employee
}

const createCardNumber = () => {
	return faker.finance.creditCardNumber("#### #### #### ####")
}

const validateUniqueTypeCard = async (
	type: TransactionTypes,
	employeeId: number
) => {
	const card = await cardRepository.findByTypeAndEmployeeId(type, employeeId)
	if (card)
		throw conflictError(`${type} card already exists for this employee`)
}

const nameFormatter = (name: string) => {
	const nameArray = name.split(" ")
	const firstName = nameArray[0]
	const lastName = nameArray[1]
	const middleName = nameArray.splice(1, nameArray.length - 1)
	let formattedMiddleName = []
	middleName.forEach(
		name => name.length >= 3 && formattedMiddleName.push(name.slice(0, 1))
	)
	return `${firstName} ${formattedMiddleName.join(" ")} ${lastName}`
}

const createSecurityCode = () => {
	return faker.finance.creditCardCVV()
}

const createExpirationDate = () => {
	return sumDateWithYear(new Date(), EXPIRATION_DATE_YEARS)
}

const generateCardData = (
	name: string,
	employeeId: number,
	type: TransactionTypes
): CardInsertData => {
	const cardNumber = createCardNumber()
	const cardholderName = nameFormatter(name)
	const expirationDate = createExpirationDate()
	const encryptedSecurityCode = encrypt(createSecurityCode())
	return {
		number: cardNumber,
		employeeId,
		cardholderName,
		securityCode: encryptedSecurityCode,
		expirationDate,
		isVirtual: false,
		isBlocked: false,
		type,
	}
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
	cardId: number,
	cvc: string
) => {
	const { expirationDate, securityCode, password } =
		await validateService.validateCardId(cardId)
	if (password) throw conflictError("Card is already activated")
	validateService.validateExpirationDate(expirationDate)
	validateSecurityCode(securityCode, cvc)
}

const validateEligibilityForBlockingOrUnblocking = async (
	cardId: number,
	password: string,
	operation: cardOperation
) => {
	const {
		password: storagePassword,
		expirationDate,
		isBlocked,
	} = await validateService.validateCardId(cardId)
	validateService.validateExpirationDate(expirationDate)
	if (decrypt(storagePassword) !== password)
		throw unauthorizedError("Invalid password")
	if (isBlocked && operation === "block")
		throw conflictError("Card is already blocked")
	if (!isBlocked && operation === "unblock")
		throw conflictError("Card is already unblocked") //TODO refactor this
}

const validateSecurityCode = (encryptedSecurityCode: string, cvc: string) => {
	const decryptedSecurityCode = decrypt(encryptedSecurityCode)
	console.log(decryptedSecurityCode, cvc)
	if (decryptedSecurityCode !== cvc) throw unauthorizedError("Invalid CVC")
}

const persistCardInDatabase = async (cardData: CardInsertData) => {
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

//const getBalance = (transactions:, recharges) => {}

const cardService = {
	validateEligibilityForCreation,
	generateCardData,
	persistCardInDatabase,
	validateEligibilityForActivation,
	persistActivationInDatabase,
	validateEligibilityForBlockingOrUnblocking,
	persistLockInDatabase,
	persistUnlockInDatabase,
	getCardStatements,
}

export default cardService
