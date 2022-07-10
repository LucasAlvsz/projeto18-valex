import Joi from "joi"

const paramsSchema = Joi.object({
	cardId: Joi.number().required(),
}).required()

const bodySchema = Joi.object({
	password: Joi.string().length(4).required(),
	cvc: Joi.string().length(3).required(),
})
	.required()
	.options({ allowUnknown: false })

const activateCardSchema = Joi.object({
	params: paramsSchema,
	body: bodySchema,
})
	.required()
	.options({ allowUnknown: true })

export default activateCardSchema
