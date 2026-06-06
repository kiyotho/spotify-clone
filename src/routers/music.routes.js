import express from 'express'
import { createMusicController, fetchAllAlbumController } from '../controllers/music.controller.js'
import multer from 'multer'
import { createAlbumController } from '../controllers/music.controller.js'
import { authArtist } from '../middlewares/auth.middleware.js'
import { fetchAllMusicController } from '../controllers/music.controller.js'
import { authUser } from '../middlewares/auth.middleware.js'
export const musicRouter = express.Router()

const uploadFile = multer({ storage: multer.memoryStorage()})

musicRouter.post('/upload', authArtist,  uploadFile.single('file'), createMusicController)
musicRouter.post('/createalbum', authArtist, createAlbumController)
musicRouter.get('/', authUser, fetchAllMusicController)
musicRouter.get('/album', authUser, fetchAllAlbumController)