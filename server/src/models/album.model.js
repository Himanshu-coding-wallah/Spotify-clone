import mongoose from "mongoose";

const albumSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    music: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "music"
    }],
    artist: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true,     
    }
})

export const AlbumModel = mongoose.model("album", albumSchema)