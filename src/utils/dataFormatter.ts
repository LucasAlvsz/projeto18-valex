import dayjs from "dayjs"
import customParseFormat from "dayjs/plugin/customParseFormat"

dayjs.extend(customParseFormat)

export const getFormattedDate = (date: Date | string) => {
	return dayjs(date).format("MM/YY")
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
