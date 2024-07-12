import { useState } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import HabitatsPage from './pages/HabitatsPage'
import DetectPage from './pages/DetectPage'

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem('accessToken') ? true : false)

    const modelPath = 'http://localhost:5173/fish_species_v7.0_web_model/model.json'

    return (
        <>  
            <Navbar isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
            <Routes>
                <Route path='/login' element={
                    isAuthenticated ? <Navigate to='/habitats' /> : <LoginPage setIsAuthenticated={setIsAuthenticated} />
                } />
                <Route path='/register' element={isAuthenticated ? <Navigate to='/habitats' /> : <RegisterPage />} />
                <Route path='/detect' element={isAuthenticated ? <DetectPage modelPath={modelPath} /> : <Navigate to='/login' />} />
                <Route path='/habitats' element={isAuthenticated ? <HabitatsPage /> : <Navigate to='/login' />} />
                <Route path='*' element={isAuthenticated ? <HabitatsPage /> : <Navigate to='/login' />} />
            </Routes>
        </>
    )
}

export default App
