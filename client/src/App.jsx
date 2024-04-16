import { Navigate, Route, Routes } from 'react-router-dom'
import DetectPage from './pages/DetectPage'
import './style/App.css'

const App = () => {
    return (
        <Routes>
            <Route path='/' element={<DetectPage />} />
            <Route path='/login' element={<h1>Login Page</h1>} />
            <Route path='/about' element={<h1>About Page</h1>} />
            <Route path='*' element={<Navigate to='/' />} />
        </Routes>
    )
}

export default App
