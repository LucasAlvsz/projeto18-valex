import { PrismaClient } from "@prisma/client"
import {
	createCardNumber,
	createExpirationDate,
	createSecurityCode,
} from "../src/utils/cardMockUtils"
import { encrypt } from "../src/utils/cryptographyUtils"

const prisma = new PrismaClient()

async function main() {
	const companies = [
		{
			name: "Driven",
			apiKey: "zadKLNx.DzvOVjQH01TumGl2urPjPQSxUbf67vs0",
		},
	]

	const employees = [
		{
			fullName: "Fulano Rubens da Silva",
			cpf: "47100935741",
			email: "fulano.silva@gmail.com",
			companyId: 1,
		},
		{
			fullName: "Ciclana de Jesus Alves",
			cpf: "08434681895",
			email: "ciclaninho@gmail.com",
			companyId: 1,
		},
	]

	const businesses = [
		{
			name: "Responde Aí",
			type: "education" as const,
		},
		{
			name: "Extra",
			type: "groceries" as const,
		},
		{
			name: "Driven Eats",
			type: "restaurant" as const,
		},
		{
			name: "Uber",
			type: "transport" as const,
		},
		{
			name: "Unimed",
			type: "health" as const,
		},
	]

	const cards = [
		{
			employeeId: 1,
			number: createCardNumber(),
			cardholderName: "FULANO R SILVA",
			securityCode: encrypt(createSecurityCode()),
			expirationDate: createExpirationDate(),
			isVirtual: false,
			isBlocked: false,
			type: "restaurant" as const,
		},
		{
			employeeId: 2,
			number: createCardNumber(),
			cardholderName: "CICLANA J ALVES",
			securityCode: encrypt(createSecurityCode()),
			expirationDate: createExpirationDate(),
			isVirtual: false,
			isBlocked: false,
			type: "transport" as const,
			password: encrypt("password"),
		},
	]

	const recharges = [
		{
			cardId: 1,
			amount: 10500,
		},
		{
			cardId: 2,
			amount: 10500,
		},
	]

	const payments = [
		{
			cardId: 1,
			businessId: 3,
			amount: 10000,
		},
		{
			cardId: 2,
			businessId: 4,
			amount: 5000,
		},
	]

	await prisma.companies.createMany({ data: companies })
	await prisma.employees.createMany({ data: employees })
	await prisma.businesses.createMany({ data: businesses })
	await prisma.cards.createMany({ data: cards })
	await prisma.recharges.createMany({ data: recharges })
	await prisma.payments.createMany({ data: payments })
}

main()
	.catch(e => {
		console.error(e)
	})
	.finally(async () => {
		await prisma.$disconnect()
	})
