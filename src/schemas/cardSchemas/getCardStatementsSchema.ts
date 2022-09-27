import Joi from "joi"

const paramsSchema = Joi.object({ id: Joi.number().required() })

const getCardStatementsSchema = Joi.object({
	params: paramsSchema,
})
	.required()
	.options({ allowUnknown: true })

export default getCardStatementsSchema
