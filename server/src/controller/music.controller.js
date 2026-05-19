import { MusicModel } from "../models/music.model.js";
import jwt from "jsonwebtoken"
import { uploadToImageKit } from "../services/imagekit.service.js";

export async function createMusic(req, res){
    const token = req.cookies.token

    if(!token){
        return res.status(400).json({
            message: "unauthorized access"
        })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        if(decoded.role !== 'artist'){
            return res.status(400).json({
                message: "You are not allowed to create music"
            })
        }
        
        const {title} = req.body
        const file = req.file
        
        const musicURI = await uploadToImageKit(file.buffer.toString("base64"))
        
        const music = await MusicModel.create({
            uri: musicURI.url,
            title,
            artist: decoded.id
        })

        return res.status(201).json({
            message: 'music created successfully',
            music
        })

    } catch (error) {
        console.log(error)
    }

}