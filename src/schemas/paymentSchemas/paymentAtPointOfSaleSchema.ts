import Joi from "joi"
import cardIdentifierSchema from "../cardIdentifierSchema"

const paramsSchema = Joi.object({
	businessId: Joi.number().positive().required(),
})
	.required()
	.options({ allowUnknown: false })

const bodySchema = cardIdentifierSchema
	.keys({
		password: Joi.string().required(),
		amount: Joi.number().integer().positive().required(),
	})
	.required()
	.options({ allowUnknown: false })

const paymentAtPointOfSaleSchema = Joi.object({
	params: paramsSchema,
	body: bodySchema,
})
	.required()
	.options({ allowUnknown: true })

export default paymentAtPointOfSaleSchema
