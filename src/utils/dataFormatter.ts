import dayjs from "dayjs"

export const getFormattedDate = (date: Date) => {
	return dayjs(date).format("MM/YY")
}

export const sumDateWithYear = (date: Date, year: number) => {
	return dayjs(date).add(year, "year").format("MM/YY")
}
