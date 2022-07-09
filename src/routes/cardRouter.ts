import { Router } from "express"

import { createCard } from "../controllers/cardController"

const cardRouter = Router()

cardRouter.post("/cards", createCard)

export default cardRouter
