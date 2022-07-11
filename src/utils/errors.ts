export const unauthorizedError = (message: string) => {
	return {
		status: 401,
		message,
	}
}

export const conflictError = (message: string) => {
	return {
		status: 409,
		message,
	}
}

export const notFoundError = (message: string) => {
	return {
		status: 404,
		message,
	}
}
