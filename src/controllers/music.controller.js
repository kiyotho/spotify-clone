import jwt from 'jsonwebtoken'
import { uploadFile } from '../services/storage.service.js'
import { musicModel } from '../models/music.model.js'


export async function createMusic(req, res) {
    
    const token = req.cookies.token

    if(!token) return res.status(401).json({ message: "unauthorized"})
    
    try{

        const decoded = jwt.verify( token, process.env.JWT_SECRET )

    }catch(err){
        res.status(401).json({message: "unauthorized"})
    }

    if( decoded.role !== "artist" ) return res.status(401).json({ message: "unauthorized"})

    const { title, description } = req.body
    const file = req.file

    


}