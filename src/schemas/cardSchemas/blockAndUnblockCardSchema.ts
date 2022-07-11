import Joi from "joi"
import cardIdentifierSchema from "../cardIdentifierSchema"

const bodySchema = cardIdentifierSchema
	.keys({
		password: Joi.string().required(),
	})
	.required()
	.options({ allowUnknown: false })

const blockAndUnblockCardSchema = Joi.object({
	body: bodySchema,
})
	.required()
	.options({ allowUnknown: true })

export default blockAndUnblockCardSchema
