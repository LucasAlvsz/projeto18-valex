import { Router } from "express"

import { rechargeCard } from "../controllers/rechargeController"

import schemaValidateMiddleware from "../middlewares/schemaValidateMiddleware"
import rechargeSchema from "../schemas/rechargeSchemas"

const { rechargeCardSchema } = rechargeSchema

const rechargeRouter = Router()

rechargeRouter.post(
	"/recharge",
	schemaValidateMiddleware(rechargeCardSchema),
	rechargeCard
)

export default rechargeRouter
