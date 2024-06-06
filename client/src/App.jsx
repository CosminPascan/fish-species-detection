import { useState } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import LoginPage from './pages/LoginPage'
import DetectPage from './pages/DetectPage'

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem('accessToken') ? true : false)

    const modelPath = 'http://localhost:5173/fish_species_v1.0_web_model/model.json'

    return (
        <>  
            <Navbar isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
            <Routes>
                <Route path='/' element={<h1>Home Page</h1>} />
                <Route path='/login' element={isAuthenticated ? <Navigate to='/' /> : <LoginPage setIsAuthenticated={setIsAuthenticated} />} />
                <Route path='/detect' element={isAuthenticated ? <DetectPage modelPath={modelPath} /> : <Navigate to='/login' />} />
                <Route path='/about' element={<h1>About Page</h1>} />
                <Route path='*' element={<Navigate to='/' />} />
            </Routes>
        </>
    )
}

export default App
