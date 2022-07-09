import { Router } from "express"

import cardRouter from "./cardRouter"

const router = Router()

router.use(cardRouter)

export default router
