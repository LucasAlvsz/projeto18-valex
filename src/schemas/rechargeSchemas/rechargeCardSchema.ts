import Joi from "joi"
import cardIdentifierSchema from "../cardIdentifierSchema"

const headers = Joi.object({
	"x-api-key": Joi.string().required(),
})
	.required()
	.options({ allowUnknown: true })

const body = cardIdentifierSchema
	.keys({
		amount: Joi.number().min(1).required(),
	})
	.required()
	.options({ allowUnknown: false })

const rechargeSchema = Joi.object({
	body,
	headers,
})
	.required()
	.options({ allowUnknown: true })

export default rechargeSchema
