import { useState } from 'react'
import { Navigate } from 'react-router-dom'
import axios from '../api/axios'
import { FaAt, FaLock } from 'react-icons/fa'
import '../style/LoginPage.css'

const RegisterPage = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [registered, setRegistered] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (password !== confirmPassword) {
            alert(`Passwords don't match!`)
        }
        
        const username = email.split('@')[0]
        const response = await axios.post('/register',
            JSON.stringify({ username, email, password })
        )

        if (response.status === 200) alert(`${response.data.message}`)
        if (response.status === 201) setRegistered(true)

        setEmail('')
        setPassword('')
        setConfirmPassword('')
    }

    if (registered) return <Navigate to='/login' />  

    return (
        <div className='login-container'>
            <div className='login-wrapper'>
                <form onSubmit={handleSubmit}>
                    <div className='login-text'>Register</div>
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
                            minLength={3}
                            required 
                        />
                        <FaLock className='icon'/>
                    </div>
                    <div className='input-box'>
                        <input 
                            type='password' 
                            placeholder='Confirm password' 
                            onChange={(e) => setConfirmPassword(e.target.value)} 
                            value={confirmPassword} 
                            minLength={3}
                            required 
                        />
                        <FaLock className='icon'/>
                    </div>
                    <button className='login-btn' type='submit'>Create account</button>
                    <div className='register-link'>
                        <p>Already have an account?&nbsp;
                            <a href='/login'>Login</a>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default RegisterPage