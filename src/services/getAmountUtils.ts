const getAmount = (dataObjectArray: any[], key: string) => {
	return dataObjectArray.reduce((acc, curr) => {
		return acc + curr[key]
	}, 0)
}

export default getAmount
