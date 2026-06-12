import {useState, useRef} from 'react'
import { useNavigate } from 'react-router-dom'
import './styles/login.css'


export function LoginPage(){

    const navigate = useNavigate()


    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const passwordRef = useRef(null)


    async function handleSubmit(){  

        const responce = await fetch('http://localhost:8000/api/auth/login', {
            method: 'POST', 
            credentials: 'include',
            body: JSON.stringify({
                username: username,
                password: password
            }), 
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const data = await responce.json()

        const id = data.user._id
        localStorage.setItem('id', id)

        if(responce.ok){
            navigate('/')
        }

    }

    function togglePassword(){
        if(passwordRef.current.type === 'password'){
            passwordRef.current.type = 'text'
        } else {
            passwordRef.current.type = 'password'
        }

    }

    return (
        <>
            <p className='info-text'>Enter your information to Login into your Account</p>
            <div className="login-container">
                <input type="text" placeholder="Username" className='input-username' value={username} onChange={ (e) => setUsername(e.target.value)}/>
                
                <div>
                    <input ref={passwordRef} type="password" placeholder="Password" className="input-password" value={password} onChange={ (e) => setPassword(e.target.value)} className='password-input' />
                    <button onClick={togglePassword}>Show</button>
                </div>

                <button onClick={handleSubmit}>Sumbit</button>
            </div>        
        </>
    )
}