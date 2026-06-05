import { connectDb } from "./src/db/db";
import app from './src/app.js'


const PORT = process.env.PORT || 8000


app.listen(PORT, () => console.log(`Server is listening on PORT ${PORT}`))

