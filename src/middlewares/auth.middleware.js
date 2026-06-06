import jwt from 'jsonwebtoken'
import 'dotenv/config'


export async function authArtist(req, res, next){
    const token = req.cookies.token

    if(!token) return res.status(401).json({ message: "access unauthorized"})

    try{

        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        if(decoded.role !== "artist")  return res.status(403).json({ message:"you dont' have access to this endpoint" })

        req.user = decoded
        next()

    } catch(err){

        console.log(err)
        res.status(401).json({message:'access unauthorized'})

    }
}


export async function authUser(req, res, next){

    const token = req.cookies.token

    if(!token) return res.status(401).json({message: "unauthorized"})

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        if(decoded.role !== 'user' && decoded.role !== 'artist') return res.status(403).json({message: "unauthorized"})
        

    } catch(err){

        console.log(err)
        res.status(401).json({message: "unauthorized"})

    }

}