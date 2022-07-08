import * as cardRepository from "../repositories/cardRepository.js"
import * as companyRepository from "../repositories/companyRepository.js"

const createCard = async (
	name: string,
	type: string,
	businessId: number,
	apiKey: string
) => {
	const validApiKey = await companyRepository.findByApiKey(apiKey)
	if (!validApiKey) throw

	// 	return card
}
