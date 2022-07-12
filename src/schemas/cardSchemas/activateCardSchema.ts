import Joi from "joi"
import cardIdentifierSchema from "../cardIdentifierSchema"

const bodySchema = cardIdentifierSchema
	.keys({
		password: Joi.string().regex(/^\d+$/).length(4).required(),
		cvc: Joi.string().length(3).required(),
	})
	.required()
	.options({ allowUnknown: false })

const activateCardSchema = Joi.object({
	body: bodySchema,
})
	.required()
	.options({ allowUnknown: true })

export default activateCardSchema
