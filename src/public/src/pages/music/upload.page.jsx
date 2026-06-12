import axios from "axios"
import { useState, useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom"
import './styles/upload.css'

export function UploadPage(){

    const navigate = useNavigate()
    const [role, setRole] = useState('')
    const sumbitButton = useRef(null)


    useEffect(() => {

        async function getRole() {
            const id = localStorage.getItem('id')
            const responce = await fetch(`http://localhost:8000/api/auth/me/${id}`)
            const data = await responce.json()
      
            setRole(data.content.role)
        }

         getRole()
    }, [])


    const handleSubmit = async (e) => {
        e.preventDefault()
        
        sumbitButton.current.disabled= true


        const formData = new FormData(e.target)
        console.log(formData)

        axios.post("http://localhost:8000/api/music/upload", formData, {withCredentials: true})
            .then((res) => {

                navigate("/")

            })
            .catch((err) => {
                console.log(err)
                alert("Error creating post")
        })


    }

    // useEffect(() => {

    //     if(role !== 'artist') {
    //         navigate('/')
    //     }

    // })



    return(
        <>
            <section className='create-post-section' >
            <h1>Create Music</h1>

            <form onSubmit={handleSubmit} className="inputs">

                <input type="file" name="file" accept=".mp3, audio/mpeg"/>
                <input type="text" name='title' placeholder='Title' required />
                <input type='text' name='description' placeholder="Description" required/>
                <button ref={sumbitButton} type='submit' >Submit</button>

            </form>

        </section>
        </>
    )
}
