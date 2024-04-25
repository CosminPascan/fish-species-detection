import { Navigate, Route, Routes } from 'react-router-dom'
import DetectPage from './pages/DetectPage'
import './style/App.css'
import LoginPage from './pages/LoginPage'
import Navbar from './components/Navbar'
import { useState } from 'react'

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    
    const modelPath = 'http://localhost:5173/fish_species_v1.0_web_model/model.json'

    return (
        <Routes>
            <Route path='/' element={<><Navbar setIsAuthenticated={setIsAuthenticated} /> <h1>Home Page</h1></>} />
            <Route path='/login' element={isAuthenticated ? <Navigate to='/' /> : <LoginPage setIsAuthenticated={setIsAuthenticated} />} />
            <Route path='/detect' element={isAuthenticated ? <DetectPage modelPath={modelPath} setIsAuthenticated={setIsAuthenticated} /> : <Navigate to='/login' />} />
            <Route path='/about' element={<><Navbar setIsAuthenticated={setIsAuthenticated} /> <h1>About Page</h1></>} />
            <Route path='*' element={<Navigate to='/' />} />
        </Routes>
    )
}

export default App
