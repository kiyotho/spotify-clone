import { userModel } from "../models/user.model.js";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

export async function registerUser(res, req) {
    
    const { username, email, password, role = 'user'} = req.body

    const isUserAlreadyExists = await userModel.findOne({
        $or: [{username: username}, { email: email }]
    })

    if(isUserAlreadyExists) return res.status(409).json({ error: "user already exists"})

    const hash = bcrypt.hast(password, 10)

    const newUser = userModel.create({
        username: username, 
        email: email, 
        password: hash, 
        role: role
    })

    const token = jwt.sign({
        id: newUser._id, 
        role: newUser.role
    }, process.env.JWT_SECRET)

    
    res.cookie("token", token)
    res.status(201).json({ message: "success", user: newUser})


}