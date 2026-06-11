import axios from 'axios'
import { useState, useEffect, useRef } from 'react'
import './styles/home.page.css'

export function HomePage(){ 

   

    const [music , addMusic] = useState([])
    const [queue, setQueue] = useState([])
    const [currentIndex, setCurrentIndex] = useState(0)
    const [currentPoint, setCurrentPoint] = useState(0)
    const [totalDuration, setTotalDuration] = useState(0)
    const [progress, setProgress] = useState(0)
    const audioRef = useRef(null)
    const outerLineRef = useRef(null)
    const innerLineRef = useRef(null)

    useEffect(() => {
        axios.get('http://localhost:8000/api/music/', {
            withCredentials: true 
        })
        .then((res) => {
            addMusic(res.data.content)
            return
        })
    }, [])

    // useEffect(() => {
    //     console.log(queue)
    // }, [queue])

    useEffect(() => {
        const audio = audioRef.current
        if(!audio) return
        
        function updateTime(){
            if(!audio.duration) return 
            setCurrentPoint(audio.currentTime.toFixed(2))
            setTotalDuration(audio.duration.toFixed(2))
            setProgress((currentPoint / totalDuration) * 100)

        }


        
        audio.addEventListener('timeupdate', updateTime)
        return () => audio.removeEventListener('timeupdate', updateTime)
    }, [queue, currentIndex, currentPoint])


    return(
        <div className='app-container'>
            <section className='content'>
                {
                    music.length > 0 ? (
                        music.map((element) => (
                            <div key={element._id} className='music-card' onClick={() => {
                                                                            if(!queue.find(q => q._id === element._id)){
                                                                                setQueue([...queue, element])
                                                                            }
                                                                        }}>
                                <p className='title'>{element.title}</p>
                                <p>{element.description}</p>
                                <p className='artist'>{element.artist.username}</p>
                            </div>
                        ))
                    ) : <h1></h1>
                }
            </section>

            <div className='player'>
                <img src={queue[currentIndex]?.albumarturi || 'https://www.svgrepo.com/show/503126/album.svg'} width='200px'/>
                <audio ref={audioRef} src={queue[currentIndex]?.uri} autoPlay controls onEnded={() => setCurrentIndex(currentIndex + 1)}/>
                <div>
                    <button onClick={() => setCurrentIndex(currentIndex - 1)}>Prev</button>
                    <button onClick={() => setCurrentIndex(currentIndex + 1)}>Next</button>
                    <button onClick={() => audioRef.current.pause()}>Pause</button>
                    <button onClick={() => audioRef.current.play()}>Play</button>
                </div>
                
                <div>
                    <input 
                        type="range" 
                        min="0" 
                        max="100" 
                        value={progress} 
                        onChange={(e) => {
                            const newTime = (e.target.value / 100) * audioRef.current.duration
                            audioRef.current.currentTime = newTime
                            setProgress(e.target.value)
                        }}
                    />
                    <p>{currentPoint}:{totalDuration}</p> 
                </div>

                <section>
                    <h1>Queue</h1>
                    {

                    queue.length > 0? (
                        queue.map((element, index ) =>(
                            <div key={index}>
                                <p style={{ color: index === currentIndex ? 'cyan' : 'white' }}>{element.title}</p>
                            </div>
                        ))
                    ) : <h1>Queue Empty</h1>
                    
                    }
                </section>

            </div>
        
        </div>
    )
}
