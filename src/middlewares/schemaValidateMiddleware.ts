import Joi from "joi"
import { NextFunction, Request, Response } from "express"

const schemaValidateMiddleware = (schema: Joi.ObjectSchema) => {
	return (req: Request, res: Response, next: NextFunction) => {
		const { error } = schema.validate(req, { abortEarly: false })
		if (error)
			return res
				.status(422)
				.send(error.details.map(({ message }) => message))
		next()
	}
}

export default schemaValidateMiddleware
