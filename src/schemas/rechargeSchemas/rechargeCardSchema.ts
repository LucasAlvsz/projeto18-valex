import Joi from "joi"
import cardIdentifierSchema from "../cardIdentifierSchema"

const headersSchema = Joi.object({
	"x-api-key": Joi.string().required(),
})
	.required()
	.options({ allowUnknown: true })

const bodySchema = cardIdentifierSchema
	.keys({
		amount: Joi.number().integer().positive().required(),
	})
	.required()
	.options({ allowUnknown: false })

const rechargeSchema = Joi.object({
	body: bodySchema,
	headers: headersSchema,
})
	.required()
	.options({ allowUnknown: true })

export default rechargeSchema
