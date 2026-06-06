import { ImageKit } from "@imagekit/nodejs/client.js";


const client = new ImageKit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY
})


export async function uploadFile(file) {

    const result = client.files.upload({
        file: file, 
        fileName: "music_" + Date.now(), 
        folder: "spotify-clone/music"
    })

    return result
    
}