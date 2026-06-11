import axios from 'axios'
import { useState, useEffect } from 'react'
import './styles/home.page.css'

export function HomePage(){ 

    const [music , addMusic] = useState([])
    const [queue, setQueue] = useState([])

    useEffect(() => {
        axios.get('http://localhost:8000/api/music/', {
            withCredentials: true 
        })
        .then((res) => {
            addMusic(res.data.content)
            return
        })
    }, [])
    return(
        <>
        <section>
            {
                music.length > 0 ? (
                    music.map((element) => (
                        <div key={element._id} className='music-card' onClick={() => {
                                                                        if(!queue.find(q => q._id === element._id)){
                                                                            setQueue([...queue, element])
                                                                            console.log(queue)
                                                                    }}}>
                            <p className='title'>{element.title}</p>
                            <p>{element.description}</p>
                            <p className='artist'>{element.artist.username}</p>
                        </div>
                    ))
                ) : <h1></h1>
            }
        </section>
        </>
    )
}
