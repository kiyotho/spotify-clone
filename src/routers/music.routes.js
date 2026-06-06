import express from 'express'
import { createMusicController, fetchAllAlbumController, getMusicInAlbumContoller, createAlbumController, fetchAllMusicController} from '../controllers/music.controller.js'
import multer from 'multer'
import { authArtist } from '../middlewares/auth.middleware.js'
import { authUser } from '../middlewares/auth.middleware.js'
export const musicRouter = express.Router()

const uploadFile = multer({ storage: multer.memoryStorage()})

musicRouter.post('/upload', authArtist,  uploadFile.single('file'), createMusicController)
musicRouter.post('/createalbum', authArtist, createAlbumController)
musicRouter.get('/', authUser, fetchAllMusicController)
musicRouter.get('/album', authUser, fetchAllAlbumController)
musicRouter.get('/album/:id', authUser, getMusicInAlbumContoller)