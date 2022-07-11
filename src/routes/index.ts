import { Router } from "express"
import "express-async-errors"

import handleErrorMiddleware from "../middlewares/handleErrorMiddleware"

import cardRouter from "./cardRouter"
import rechargeRouter from "./rechargeRouter"
import paymentRouter from "./paymentRouter"

const router = Router()
router.use("/card", cardRouter)
router.use("/card", rechargeRouter)
router.use("/card", paymentRouter)
router.use(handleErrorMiddleware)

export default router
