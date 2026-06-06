import express from 'express'
import { createMusicController } from '../controllers/music.controller.js'
import multer from 'multer'


export const musicRouter = express.Router()

const uploadFile = multer({ storage: multer.memoryStorage()})

musicRouter.post('/upload', uploadFile.single('file'), createMusicController)

