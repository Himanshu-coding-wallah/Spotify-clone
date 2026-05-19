import express from "express";
import multer from "multer"
import { createAlbum, createMusic } from "../controller/music.controller.js";

const upload = multer({storage: multer.memoryStorage()})

const musicRoute = express.Router()

musicRoute.post('/upload', upload.single("music"), createMusic)
musicRoute.post('/album', createAlbum)


export default musicRoute