import { Request, Response } from "express"

const handleErrorMiddleware = (
	err: Error,
	req: Request,
	res: Response,
	next: Function
) => {
	res.status(err.status || 500).send(err.message || "Internal server error")
}

interface Error {
	type: string
	status: number
	message: string
}

export default handleErrorMiddleware
