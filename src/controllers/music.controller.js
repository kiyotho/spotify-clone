import jwt from 'jsonwebtoken'
import { uploadFile } from '../services/storage.service.js'
import { musicModel } from '../models/music.model.js'


export async function createMusicController(req, res) {
    
    const token = req.cookies.token

    if(!token) return res.status(401).json({ message: "unauthorized"})

    try{

            const decoded = jwt.verify( token, process.env.JWT_SECRET )
            console.log(decoded)

    

        if( decoded.role !== "artist" ) return res.status(401).json({ message: "unauthorized"})

        const { title, description } = req.body
        const file = req.file

        const uploadedFile = await uploadFile(file.buffer.toString("base64"))
        console.log(uploadedFile)

        const uploadedMusic = await musicModel.create({
            uri: uploadedFile.url, 
            title: title, 
            description: description, 
            artist: decoded.id
        })

        res.status(201).json({message: "success", content: uploadedMusic})

    }catch(err){

        return res.status(401).json({message: "unauthorized"})
        
    }

}