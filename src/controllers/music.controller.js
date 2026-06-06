import jwt from 'jsonwebtoken'
import { uploadFile } from '../services/storage.service.js'
import { musicModel } from '../models/music.model.js'
import { albumModel } from '../models/album.model.js'

export async function createMusicController(req, res) {

    const { title, description, user } = req.body
    const file = req.file

    const uploadedFile = await uploadFile(file.buffer.toString("base64"))

    const uploadedMusic = await musicModel.create({
        uri: uploadedFile.url, 
        title: title, 
        description: description, 
        artist: user.id
    })

    res.status(201).json({message: "success", content: uploadedMusic})

}

export async function createAlbumController(req, res){

    const {title, musics, user} = req.body

    const newAlbum = await albumModel.create({
        title: title,
        artist: user.id,
        musics: musics
    })

    res.status(201).json({ message: "success", content: newAlbum})

}