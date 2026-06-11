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
    const [volume, setVolume] = useState(0)
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


    useEffect(() => {
        const audio = audioRef.current
        if(!audio) return
        
        function updateTime(){
            if(!audio.duration) return 

            setCurrentPoint(Math.trunc(audio.currentTime))
            setTotalDuration(Math.trunc(audio.duration))
            setProgress((currentPoint / totalDuration) * 100)

        }


        
        audio.addEventListener('timeupdate', updateTime)
        return () => audio.removeEventListener('timeupdate', updateTime)
    }, [queue, currentIndex, currentPoint])


    return(
        <div className='app-container'>
            
            <section className='content'>
                <h2 style={{ color: 'white', marginBottom: '16px' }}>Songs</h2>
                {
                    music.length > 0 ? (
                        music.map((element) => (
                            <div key={element._id} className='music-card' onClick={() => {
                                                                            if(!queue.find(q => q._id === element._id)){
                                                                                setQueue([...queue, element])
                                                                            }
                                                                        }}>
                                <img 
                                    src={element.albumarturi || 'https://www.billboard.com/wp-content/uploads/2023/07/asap-rocky-long-live-asap-2013-billboard-1240.jpg?w=768'} 
                                    className='card-img'
                                />
                                <p className='title'>{element.title}</p>
                                <p className='artist'>{element.artist.username}</p>
                            </div>
                        ))
                    ) : <h1></h1>
                }
            </section>

            
            <div className='player'>
                <img src={queue[currentIndex]?.albumarturi || 'https://www.billboard.com/wp-content/uploads/2023/07/asap-rocky-long-live-asap-2013-billboard-1240.jpg?w=768'} width='200px' className='discography-img'/>
                <audio ref={audioRef} src={queue[currentIndex]?.uri} autoPlay controls onEnded={() => setCurrentIndex(currentIndex+1 === queue.length ? 0 : currentIndex + 1)}/>
                <div className='button-container'>
                    <button onClick={() => setCurrentIndex(currentIndex - 1)}>Prev</button>
                    <button onClick={() => audioRef.current.pause()}>Pause</button>
                    <button onClick={() => audioRef.current.play()}>Play</button>
                    <button onClick={() => setCurrentIndex(currentIndex + 1 === queue.length ? 0 : currentIndex + 1)}>Next</button>
                </div>
                  
                <div className='slider-metadata'>
                    <p>{Math.trunc(currentPoint/60)}:{String(Math.trunc(currentPoint%60)).padStart(2,'0')}</p>
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
                    <p>{Math.trunc(totalDuration/60)}:{String(Math.trunc(totalDuration%60)).padStart(2,'0')}</p> 
                </div>
                <div className='volume-adjust'>
                    <img src='https://www.svgrepo.com/show/385213/speaker-audio-sound-loud.svg' width='30px'/>
                    <input 
                        type='range'
                        min='0'
                        max='100'
                        value={volume}
                        defaultValue='50'
                        onChange={(e) =>{
                            const newVolume = e.target.value / 100
                            audioRef.current.volume = newVolume
                            setVolume(e.target.value)
                        }}
                    />
                </div>
                  
                <div>
                    <h1 className='queue-text'>Queue</h1>
                    <section className='queue'>
                        {
                            queue.length > 0? (
                            queue.map((element, index ) =>(
                                <div key={index}>
                                    <p style={{ color: index === currentIndex ? 'cadetblue' : 'white' }}>{element.title}</p>
                                </div>
                            ))
                        ) : <h1>Queue Empty</h1>
                        }
                    </section>
                </div>
            </div>
            
        </div>
    )
}
