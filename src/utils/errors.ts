export const unauthorizedError = (message: string) => {
	return {
		type: "unauthorized",
		status: 401,
		message,
	}
}

export const conflictError = (message: string) => {
	return {
		type: "conflict",
		status: 409,
		message,
	}
}

export const notFoundError = (message: string) => {
	return {
		type: "notFound",
		status: 404,
		message,
	}
}
