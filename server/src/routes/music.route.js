import express from "express";
import multer from "multer"
import { createMusic } from "../controller/music.controller.js";

const upload = multer({storage: multer.memoryStorage()})

const musicRoute = express.Router()

musicRoute.post('/upload', upload.single("music"), createMusic)


export default musicRoute