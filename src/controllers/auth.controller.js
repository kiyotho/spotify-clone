import { userModel } from "../models/user.model.js";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

export async function registerUser(req, res) {
    
    const { username, email, password, role = 'user'} = req.body

    const isUserAlreadyExists = await userModel.findOne({
        $or: [{username: username}, { email: email }]
    })

    if(isUserAlreadyExists) return res.status(409).json({ error: "user already exists"})

    const hash = await bcrypt.hash(password, 10)

    const newUser = await userModel.create({
        username: username, 
        email: email, 
        password: hash, 
        role: role
    })

    const token = jwt.sign({
        id: newUser._id, 
        role: newUser.role
    }, process.env.JWT_SECRET)

    
    res.cookie("token", token, {
        httpOnly: true, 
        sameSite: 'lax'
    })
    res.cookie('islogged_in', 'true')
    res.status(201).json({ message: "success", user: newUser})


}


export async function loginUser(req, res){

    const { username, email, password } = req.body

    const user = await userModel.findOne({
        $or: [
            {username: username}, 
            {email: email}
        ]
    })

    if(!user) return res.status(401).json({ message: "Invalid credentials" })
    
    const isPasswordValid = await bcrypt.compare(password, user.password)

    if(!isPasswordValid) return res.status(401).json({ message: "Invalid credentials" })

    const token = await jwt.sign( {
        id: user._id, 
        role: user.role
    }, process.env.JWT_SECRET)

    res.cookie("token", token)

    res.status(200).json({ 
        message: "success", 
        user: user
    })

}

export async function logoutUser(req, res){

    const token = req.cookies.token

    if(!token) return res.status(401).json({
        message: 'user not logged in'
    })

    res.clearCookie('token')
    res.clearCookie('islogged_in')
    
    res.status(200).json({
        message: 'user loged out sucessfully'
    })
}