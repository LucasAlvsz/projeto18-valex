import { Router } from "express"
import "express-async-errors"

import handleErrorMiddleware from "../middlewares/handleErrorMiddleware"

import cardRouter from "./cardRouter"
import rechargeRouter from "./rechargeRouter"

const router = Router()
router.use("/card", cardRouter)
router.use("/card", rechargeRouter)
router.use(handleErrorMiddleware)

export default router
