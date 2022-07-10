import express from "express"
import cors from "cors"

import router from "./routes/index"
import { decrypt } from "./utils/cryptography"

const app = express()
app.use(cors())
app.use(express.json())
app.use(router)

app.get("/", (req, res) => {
	res.send("Hello World!")
})

console.log(
	decrypt(
		"ee3997de29a747219b3f4abf1827a77451c8741bdf5ad6c0c5e0f60906767404d091507aa1e713a3c10d8f66fe65fcd2c0d8d70b8bbcfda8c54b663febad915f64c0ab62be31b575506e9483b2a2ded2fb05132074a7ca5208a5f63c753b0c4ac12cd4"
	)
)

app.listen(+process.env.PORT || 5000, () => {
	console.log(`Server running on port ${process.env.PORT || 5000}`)
})
