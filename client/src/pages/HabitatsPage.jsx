import { useState, useEffect } from 'react'
import HabitatsList from '../components/HabitatsList'
import '../style/HabitatsPage.css'

const HabitatsPage = () => {
    const [habitats, setHabitats] = useState([])

    useEffect(() => {
        const loadHabitats = async () => {
            let token = localStorage.getItem('accessToken')
            const response = await fetch('http://localhost:5234/api/habitats/all', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
            if (response.status === 401) {
                await fetch('http://localhost:5234/api/refresh-token', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    credentials: 'include'
                })
                    .then(res => res.json())
                    .then(data => {
                        localStorage.setItem('accessToken', data.accessToken)
                        token = localStorage.getItem('accessToken')
                    })
            }

            await fetch('http://localhost:5234/api/habitats/all', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
                .then(res => res.json())
                .then(data => {
                    setHabitats(data.habitats)
                })
        }

        loadHabitats()
    }, [])

    return (
        <div className='habitats-container'>
            <HabitatsList habitats={habitats}/>
        </div>
    )
}

export default HabitatsPage