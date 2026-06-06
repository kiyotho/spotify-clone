import express from 'express'
import { createMusic } from '../controllers/music.controller.js'



export const musicRouter = express.Router()


musicRouter.post('/createmusic', createMusic)

