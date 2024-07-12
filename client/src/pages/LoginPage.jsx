import { useState } from 'react'
import axios from '../api/axios'
import { FaAt, FaLock } from 'react-icons/fa'
import '../style/LoginPage.css'

const LoginPage = ({ setIsAuthenticated }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        
        try {
            const response = await axios.post('/login',
                JSON.stringify({ email, password })
            )
            localStorage.setItem('accessToken', response.data.accessToken)
            setEmail('')
            setPassword('')
            setIsAuthenticated(() => true)
        } catch (err) {
            alert(`${err.response.data.message}`)
        }    
    }

    return (
        <div className='login-container'>
            <div className='login-wrapper'>
                <form onSubmit={handleSubmit}>
                    <div className='login-text'>Login</div>
                    <div className='input-box'>
                        <input 
                            type='email' 
                            placeholder='Email' 
                            onChange={(e) => setEmail(e.target.value)} 
                            value={email} 
                            required 
                        />
                        <FaAt className='icon'/>
                    </div>
                    <div className='input-box'>
                        <input 
                            type='password' 
                            placeholder='Password' 
                            onChange={(e) => setPassword(e.target.value)} 
                            value={password} 
                            required 
                        />
                        <FaLock className='icon'/>
                    </div>
                    <button className='login-btn' type='submit'>Login</button>
                    <div className='register-link'>
                        <p>Don't have an account?&nbsp;
                            <a href='/register'>Register</a>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default LoginPage