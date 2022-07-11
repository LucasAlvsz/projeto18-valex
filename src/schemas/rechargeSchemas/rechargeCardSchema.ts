import Joi from "joi"

const params = Joi.object({
	cardId: Joi.number().required(),
})
	.required()
	.options({ allowUnknown: false })

const headers = Joi.object({
	"x-api-key": Joi.string().required(),
})
	.required()
	.options({ allowUnknown: true })

const body = Joi.object({
	amount: Joi.number().min(1).required(),
})
	.required()
	.options({ allowUnknown: false })

const rechargeSchema = Joi.object({
	params,
	body,
	headers,
})
	.required()
	.options({ allowUnknown: true })

export default rechargeSchema
