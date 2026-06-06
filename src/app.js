import express from 'express'
import cookieParser from 'cookie-parser'
import { authRouter } from './routers/auth.routes.js'

const app = express()
app.use(express.json())
app.use(cookieParser())


app.use('/api/auth', authRouter)


export{ app }