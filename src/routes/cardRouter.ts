import { Router } from "express"

import {
	activateCard,
	blockCard,
	createCard,
	getCardStatements,
	unblockCard,
} from "../controllers/cardController"
import schemaValidateMiddleware from "../middlewares/schemaValidateMiddleware"
import cardSchemas from "../schemas/cardSchemas/index"

const { createCardSchema, activateCardSchema, blockAndUnblockCardSchema, getCardStatementsSchema } =
	cardSchemas

const cardRouter = Router()

cardRouter
	.post("/create/:employeeId", schemaValidateMiddleware(createCardSchema), createCard)
	.put("/activate", schemaValidateMiddleware(activateCardSchema), activateCard)
	.put("/block", schemaValidateMiddleware(blockAndUnblockCardSchema), blockCard)
	.put("/unblock", schemaValidateMiddleware(blockAndUnblockCardSchema), unblockCard)
	.get("/statements/:id", schemaValidateMiddleware(getCardStatementsSchema), getCardStatements)

export default cardRouter
