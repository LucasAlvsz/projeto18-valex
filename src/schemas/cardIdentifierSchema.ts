import Joibase from "joi"
import JoiDate from "@joi/date"

const Joi = Joibase.extend(JoiDate)

const cardIdentifierSchema = Joi.object()
	.keys({
		name: Joi.string().required(),
		number: Joi.string()
			.regex(/^[0-9]{4} [0-9]{4} [0-9]{4} [0-9]{4}$/)
			.required(),
		expirationDate: Joi.date().format("MM/YY").required(),
	})
	.required()

export default cardIdentifierSchema
