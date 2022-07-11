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
	"/create/:employeeId",
	schemaValidateMiddleware(createCardSchema),
	createCard
)
cardRouter.put(
	"/activate",
	schemaValidateMiddleware(activateCardSchema),
	activateCard
)

cardRouter.put(
	"/block",
	schemaValidateMiddleware(blockAndUnblockCardSchema),
	blockCard
)

cardRouter.put(
	"/unblock",
	schemaValidateMiddleware(blockAndUnblockCardSchema),
	unblockCard
)

cardRouter.get("/cards/:cardId/transactions")

export default cardRouter
