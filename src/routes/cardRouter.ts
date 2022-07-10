import { Router } from "express"

import { activateCard, createCard } from "../controllers/cardController"
import schemaValidateMiddleware from "../middlewares/schemaValidateMiddleware"
import activateCardSchema from "../schemas/activateCardSchema"
import createCardSchema from "../schemas/createCardSchema"

const cardRouter = Router()

cardRouter.post(
	"/cards/:employeeId",
	schemaValidateMiddleware(createCardSchema),
	createCard
)
cardRouter.put(
	"/cards/:cardId/activate",
	schemaValidateMiddleware(activateCardSchema),
	activateCard
)

export default cardRouter
