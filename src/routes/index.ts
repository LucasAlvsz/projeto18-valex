import { Router } from "express"
import "express-async-errors"

import handleErrorMiddleware from "../middlewares/handleErrorMiddleware"

import cardRouter from "./cardRouter"

const router = Router()

router.use(cardRouter)
router.use(handleErrorMiddleware)

export default router
