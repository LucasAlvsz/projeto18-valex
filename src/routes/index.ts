import { Router } from "express"
import "express-async-errors"

import handleErrorMiddleware from "../middlewares/handleErrorMiddleware"

import cardRouter from "./cardRouter"
import rechargeRouter from "./rechargeRouter"
import paymentRouter from "./paymentRouter"

const router = Router()

router
	.use("/card", cardRouter)
	.use("/card", rechargeRouter)
	.use("/card", paymentRouter)
	.use(handleErrorMiddleware)

export default router
