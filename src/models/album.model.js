import mongoose from "mongoose";

const albumSchema = new mongoose.Schema({
    title: {
        type: String, 
        required: true
    }, 
    artist: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'user', 
        required: true
    }, 
    musics: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'music',
        required: true
    }]
})

export const albumModel = new mongoose.model('album', albumSchema)