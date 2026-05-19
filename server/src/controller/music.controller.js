import { MusicModel } from "../models/music.model.js";
import jwt from "jsonwebtoken"
import { uploadToImageKit } from "../services/imagekit.service.js";
import { AlbumModel } from "../models/album.model.js";

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

export async function createAlbum(req, res){
    const token = req.cookies.token
    if(!token){
        return res.status(409).json({
            message: 'you are not authorized'
        })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        if(decoded.role !== 'artist'){
            return res.status(409).json({
                message: "you dont have permission to create albums"
            })
        }

        const {title, musicId} = req.body

        const  album = await AlbumModel.create({
            title,
            artist: decoded.id,
            music: musicId

        })

        return res.status(201).json({
            message: 'album is created',
            album
        })
    } catch (error) {
        console.log(error.message)
        res.status(404)
    }

}