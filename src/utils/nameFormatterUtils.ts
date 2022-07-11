const nameFormatter = (name: string) => {
	const nameArray = name.toUpperCase().split(" ")
	const firstName = nameArray.shift()
	const lastName = nameArray.pop()
	let formattedMiddleName = []
	nameArray.forEach(
		name => name.length >= 3 && formattedMiddleName.push(name.slice(0, 1))
	)
	return `${firstName} ${formattedMiddleName.join(" ")} ${lastName}`
}

export default nameFormatter
