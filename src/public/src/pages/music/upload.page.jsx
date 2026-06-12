import { useState, useEffect } from "react"
import { Navigate } from "react-router-dom"


export function UploadPage(){

    const navigate = Navigate()

    useEffect(() => {
        const role = localStorage.getItem('role')
        if(role !== 'artist') {
            navigate('/')
        }
    }, [])

    return(
        <>
            <input type="file" name="audioFile" accept=".mp3, audio/mpeg"  />
        </>
    )
}
