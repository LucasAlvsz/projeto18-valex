import { faker } from "@faker-js/faker"

import {
	notFoundError,
	unauthorizedError,
	conflictError,
} from "../utils/errors"
import * as companyRepository from "../repositories/companyRepository"
import * as employeeRepository from "../repositories/employeeRepository"
import * as cardRepository from "../repositories/cardRepository"
import * as paymentRepository from "../repositories/paymentRepository"
import * as rechargeRepository from "../repositories/rechargeRepository"

import {
	TransactionTypes,
	CardInsertData,
} from "../repositories/cardRepository"

import { compareDates, sumDateWithYear } from "../utils/dataFormatter"
import { encrypt, decrypt } from "../utils/cryptography"

// Magic Numbers
const EXPIRATION_DATE_YEARS = 5

type cardOperation = "unblock" | "block"

const createCard = async (
	type: TransactionTypes,
	employeeId: number,
	apiKey: string
) => {
	const { id } = await validateApiKey(apiKey)
	const { companyId, fullName } = await validateEmployee(employeeId)
	if (companyId !== id)
		throw unauthorizedError("User does not belong to this company")
	await validateUniqueTypeCard(type, employeeId)
	const cardData = generateCardData(fullName, id, type)
	await cardRepository.insert(cardData)
}

const activateCard = async (cardId: number, password: string, cvc: string) => {
	await validateEligibilityForActivation(cardId, cvc)
	const cardDataUpdate = {
		isBlocked: false,
		password: encrypt(password),
	}
	await cardRepository.update(cardId, cardDataUpdate)
}

const blockCard = async (cardId: number, password: string) => {
	await validateEligibilityForBlockingOrUnblocking(cardId, password, "block")
	const cardDataUpdate = {
		isBlocked: true,
	}
	await cardRepository.update(cardId, cardDataUpdate)
}

const unblockCard = async (cardId: number, password: string) => {
	await validateEligibilityForBlockingOrUnblocking(
		cardId,
		password,
		"unblock"
	)
	const cardDataUpdate = {
		isBlocked: false,
	}
	await cardRepository.update(cardId, cardDataUpdate)
}

const getCardStatements = async (cardId: number, password: string) => {
	const { id } = await validateCardId(cardId)
	const transactions = await paymentRepository.findByCardId(cardId)
	const recharges = await rechargeRepository.findByCardId(cardId)
	//const balance = getBalance(transactions, recharges)
}

const validateApiKey = async (apiKey: string) => {
	const validApiKey = await companyRepository.findByApiKey(apiKey)
	if (!validApiKey) throw unauthorizedError("Invalid API key")
	return validApiKey
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

const validateEligibilityForActivation = async (
	cardId: number,
	cvc: string
) => {
	const { expirationDate, securityCode, password } = await validateCardId(
		cardId
	)
	if (password) throw conflictError("Card is already activated")
	validateExpirationDate(expirationDate)
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
	} = await validateCardId(cardId)
	validateExpirationDate(expirationDate)
	if (decrypt(storagePassword) !== password)
		throw unauthorizedError("Invalid password")
	if (isBlocked && operation === "block")
		throw conflictError("Card is already blocked")
	if (!isBlocked && operation === "unblock")
		throw conflictError("Card is already unblocked")
}

const validateCardId = async (cardId: number) => {
	const card = await cardRepository.findById(cardId)
	if (!card) throw notFoundError("Card not found")
	return card
}

const validateExpirationDate = (expirationDate: string) => {
	if (compareDates(new Date(), expirationDate) === "after")
		throw unauthorizedError("Card expired")
}

const validateSecurityCode = (encryptedSecurityCode: string, cvc: string) => {
	const decryptedSecurityCode = decrypt(encryptedSecurityCode)
	console.log(decryptedSecurityCode, cvc)
	if (decryptedSecurityCode !== cvc) throw unauthorizedError("Invalid CVC")
}

//const getBalance = (transactions:, recharges) => {}

const cardService = {
	createCard,
	activateCard,
	blockCard,
	unblockCard,
	getCardStatements,
}

export default cardService
