import Joi from "joi"
import cardIdentifierSchema from "../cardIdentifierSchema"

const bodySchema = cardIdentifierSchema.options({ allowUnknown: false })

const getCardStatementsSchema = Joi.object({
	body: bodySchema,
})
	.required()
	.options({ allowUnknown: true })

export default getCardStatementsSchema
