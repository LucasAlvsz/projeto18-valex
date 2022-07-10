import { Router } from "express"

import {
	activateCard,
	blockCard,
	createCard,
} from "../controllers/cardController"
import schemaValidateMiddleware from "../middlewares/schemaValidateMiddleware"
import cardSchemas from "../schemas/cardSchemas/index"

const { createCardSchema, activateCardSchema, blockCardSchema } = cardSchemas

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

cardRouter.put(
	"/cards/:cardId/block",
	schemaValidateMiddleware(blockCardSchema),
	blockCard
)

export default cardRouter
