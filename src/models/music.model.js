import mongoose from "mongoose";


const musicSchema = new mongoose.Schema({

    uri: {
        type: String, 
        required: true
    },
    title: {
        type: String, 
        required: true
    }, 
    description: {
        type: String
    },
    artist: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'user', 
        required: true

    }

})


export const musicModel = new mongoose.model("music", musicSchema)


