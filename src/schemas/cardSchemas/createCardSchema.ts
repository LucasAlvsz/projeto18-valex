import Joi from "joi"

const paramsSchema = Joi.object({
	employeeId: Joi.number().required(),
}).required()

const bodySchema = Joi.object({
	type: Joi.string()
		.valid("groceries", "restaurant", "transport", "education", "health")
		.required(),
})
	.required()
	.options({ allowUnknown: false })

const headersSchema = Joi.object({
	"x-api-key": Joi.string().required(),
})
	.required()
	.options({ allowUnknown: true })

const createCardSchema = Joi.object({
	params: paramsSchema,
	body: bodySchema,
	headers: headersSchema,
})
	.required()
	.options({ allowUnknown: true })

export default createCardSchema
