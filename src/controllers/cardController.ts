import { Request, Response } from "express"

export const createCard = async (req: Request, res: Response) => {
	const { nacme, type, businessId } = req.body
	const { employeeId } = req.params
	const { "x-api-key": apiKey } = req.headers
	console.log(apiKey)
	res.sendStatus(200)

	//const card = await cardRepository.createCard(name, type, businessId)
}
