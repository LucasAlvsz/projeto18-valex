import Cryptr from "cryptr"
const cryptr = new Cryptr(process.env.SECRET_KEY)

export const encrypt = (text: string) => {
	return cryptr.encrypt(text)
}

export const decrypt = (text: string) => {
	return cryptr.decrypt(text)
}
