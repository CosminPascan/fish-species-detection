import { useState } from 'react'
import { FaAt, FaLock } from 'react-icons/fa'
import '../style/LoginPage.css'

const LoginPage = ({ setIsAuthenticated }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleEmail = (e) => {
        setEmail(e.target.value)
    }

    const handlePassword = (e) => {
        setPassword(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        fetch('http://localhost:5234/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({ email, password })
        })
            .then(res => res.json())
            .then(data => {
                if (data.message === 'Invalid email!' || data.message === 'Invalid password!') {
                    alert(`${data.message}`)
                } else {
                    localStorage.setItem('accessToken', data.accessToken)
                    setIsAuthenticated(() => true)
                }
            })
            .catch(error => console.error('Error: ', error))

        setEmail('')
        setPassword('')
    }

    return (
        <div className='login-container'>
            <div className='login-wrapper'>
                <form onSubmit={handleSubmit}>
                    <div className='login-text'>Login</div>
                    <div className='input-box'>
                        <input type='email' placeholder='Email' required onChange={handleEmail} value={email} />
                        <FaAt className='icon'/>
                    </div>
                    <div className='input-box'>
                        <input type='password' placeholder='Password' required onChange={handlePassword} value={password} />
                        <FaLock className='icon'/>
                    </div>
                    <button className='login-btn' type='submit'>Login</button>
                </form>
            </div>
        </div>
    )
}

export default LoginPage