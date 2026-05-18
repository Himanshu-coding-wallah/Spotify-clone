import jwt from "jsonwebtoken"
import { UserModel } from "../models/user.model.js"
import bcrypt from "bcrypt"
import { SessionModel } from "../models/session.model.js"


export async function register(req, res){
    const {name, username, email, password, role='user'} = req.body

    if(!name || !username || !email || !password){
        return res.json({
            message: "please fill all the details"
        })
    }

    const isAlreadyExist = await UserModel.findOne({
        $or: [ {username}, {email}]
    })

    if(isAlreadyExist){
        return res.status(409).json({
            message: "user already exist"
        })
    }

    const hashPassword = await bcrypt.hash(password, 10)

    const user = await UserModel.create({
        name,
        username,
        email,
        password: hashPassword,
        role
    })

    const token = jwt.sign(
        { 
            id: user._id,
            role: user.role
        },
        process.env.JWT_SECRET,
        {expiresIn: '7d'}
    )

    res.cookie("token", token, {
        httpOnly: true,
        secure:true,
        sameSite:true,
        maxAge: 7*24*60*60*1000 
    })  

    return res.status(200).json({
        message: "user is registered successfully",
        user
    })
    
}

export async function login(req, res){

}