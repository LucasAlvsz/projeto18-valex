import dayjs from "dayjs"
import customParseFormat from "dayjs/plugin/customParseFormat"

dayjs.extend(customParseFormat)

export const getFormattedDate = (
	objectData: object[],
	key: string,
	format: string
) => {
	const formattedDate = objectData.map(item => {
		const date = dayjs(item[key])
		return {
			...item,
			[key]: date.format(format),
		}
	})
	return formattedDate
}

export const sumDateWithYear = (date: Date, year: number) => {
	return dayjs(date).add(year, "year").format("MM/YY")
}

export const compareDates = (
	date: Date | string,
	dateToCompare: Date | string
) => {
	return (
		(dayjs(new Date(date)).isAfter(dayjs(dateToCompare, "MM/YY")) &&
			"after") ||
		(dayjs(new Date(date)).isBefore(dayjs(dateToCompare, "MM/YY")) &&
			"before")
	)
}
