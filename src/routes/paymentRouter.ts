import { Router } from "express"

import { paymentAtPointOfSale } from "../controllers/paymentController"

import schemaValidateMiddleware from "../middlewares/schemaValidateMiddleware"
import paymentSchemas from "../schemas/paymentSchemas"

const { paymentAtPointOfSaleSchema } = paymentSchemas

const paymentRouter = Router()

paymentRouter.post(
	"/payment/POS/:businessId",
	schemaValidateMiddleware(paymentAtPointOfSaleSchema),
	paymentAtPointOfSale
)

export default paymentRouter
