import { connectDb } from "./src/db/db.js";
import { app } from './src/app.js'
import express from 'express'

const PORT = process.env.PORT || 8000

connectDb()

app.listen(PORT, () => console.log(`Server is listening on PORT ${PORT}`))

