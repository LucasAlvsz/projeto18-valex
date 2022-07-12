import { faker } from "@faker-js/faker"
import { sumDateWithYear } from "./dateFormatterUtils"
import { EXPIRATION_DATE_YEARS } from "./magicNumberUtils"

export const createCardNumber = () => {
	return faker.finance.creditCardNumber("#### #### #### ####")
}

export const createExpirationDate = () => {
	return sumDateWithYear(new Date(), EXPIRATION_DATE_YEARS)
}

export const createSecurityCode = () => {
	return faker.finance.creditCardCVV()
}
