import { Request, Response } from "express"

export const createCard = async (req: Request, res: Response) => {
	const { name, type, businessId } = req.body
	const { "x-api-key": apiKey } = req.headers
	console.log(apiKey)
	res.sendStatus(200)

	//const card = await cardRepository.createCard(name, type, businessId)
}
