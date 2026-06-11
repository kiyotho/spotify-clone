import {useState, useRef} from 'react'
import './styles/register.css'


export function RegisterPage(){


    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [role, setRole] = useState("user")
    const passwordRef = useRef(null)


    async function handleSubmit(){

        const responce = await fetch('http://localhost:8000/api/auth/register', {
            method: 'POST', 
            credentials: 'include',
            body: JSON.stringify({
                username: username,
                email: email, 
                password: password,
                role: role
            }), 
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const data = await responce.json()

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
            <p className='info-text'>Enter your information to make an Account</p>
            <div className="register-container">
                <input type="text" placeholder="Username" className='input-username' value={username} onChange={ (e) => setUsername(e.target.value)}/>
                <input type='text' placeholder="Email" className="input-email" value={email} onChange={ (e) => setEmail(e.target.value)}/>
                <div>
                    <input ref={passwordRef} type="password" placeholder="Password" className="input-password" value={password} onChange={ (e) => setPassword(e.target.value)} className='password-input' />
                    <button onClick={togglePassword}>Show</button>
                </div>
                <select name='role' className='role-selector' value={role} onChange={(e) => setRole(e.target.value)}>
                    <option value='user'>User</option>
                    <option value='artist'>Artist</option>
                </select>
                <button onClick={handleSubmit}>Sumbit</button>
            </div>        
        </>
    )
}