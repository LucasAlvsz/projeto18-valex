const unauthorizedError = message => {
	return {
		type: "unauthorized",
		status: 401,
		message,
	}
}
