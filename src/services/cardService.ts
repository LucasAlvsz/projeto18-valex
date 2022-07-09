import { unauthorizedError } from "../utils/errors"
import * as cardRepository from "../repositories/cardRepository"
import * as companyRepository from "../repositories/companyRepository"

const createCard = async (
	name: string,
	type: string,
	businessId: number,
	apiKey: string
) => {
	// Promise.all([
	//     await validateApiKey(apiKey),
}

const validateApiKey = async (apiKey: string) => {
	const validApiKey = await companyRepository.findByApiKey(apiKey)
	if (!validApiKey) throw unauthorizedError("Invalid API key")
	return validApiKey
}
