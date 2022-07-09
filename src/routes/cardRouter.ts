import { Router } from "express"

import { createCard } from "../controllers/cardController"
import schemaValidateMiddleware from "../middlewares/schemaValidateMiddleware"
import createCardSchema from "../schemas/createCardSchema"

const cardRouter = Router()

cardRouter.post(
	"/cards/:employeeId",
	schemaValidateMiddleware(createCardSchema),
	createCard
)

export default cardRouter
