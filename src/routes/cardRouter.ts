import { Router } from "express"

import {
	activateCard,
	blockCard,
	createCard,
	unblockCard,
} from "../controllers/cardController"
import schemaValidateMiddleware from "../middlewares/schemaValidateMiddleware"
import cardSchemas from "../schemas/cardSchemas/index"

const { createCardSchema, activateCardSchema, blockAndUnblockCardSchema } =
	cardSchemas

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
	schemaValidateMiddleware(blockAndUnblockCardSchema),
	blockCard
)

cardRouter.put(
	"/cards/:cardId/unblock",
	schemaValidateMiddleware(blockAndUnblockCardSchema),
	unblockCard
)

export default cardRouter
