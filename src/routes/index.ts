import { Router } from "express"
import "express-async-errors"

import handleErrorMiddleware from "../middlewares/handleErrorMiddleware"

import cardRouter from "./cardRouter"
import rechargeRouter from "./rechargeRouter"

const router = Router()
router.use(cardRouter)
router.use(rechargeRouter)
router.use(handleErrorMiddleware)

export default router
