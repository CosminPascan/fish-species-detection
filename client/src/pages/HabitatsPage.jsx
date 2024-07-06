import { useState, useEffect } from 'react'
import axios from '../api/axios'
import AddHabitatForm from '../components/AddHabitatForm'
import HabitatsList from '../components/HabitatsList'
import '../style/HabitatsPage.css'

const HabitatsPage = () => {
    const [habitats, setHabitats] = useState([])
    const [showForm, setShowForm] = useState(false);

    const getHabitats = async (token) => {
        const response = await axios.get('/habitats/all', 
            {
                headers: { 'Authorization': `Bearer ${token}` }
            }
        ) 
        setHabitats(response.data.habitats)
    }

    const loadHabitats = async () => {
        let token = localStorage.getItem('accessToken')
        try {
            await getHabitats(token)
        } catch (err) {
            if(err.response.status === 401) {
                const res = await axios.post('/refresh-token')
                localStorage.setItem('accessToken', res.data.accessToken)
                token = localStorage.getItem('accessToken')
                getHabitats(token)
            }
        }
    }

    useEffect(() => {
        loadHabitats()
    }, [])

    return (
        <div className='habitats-container'>
            <div className='habitats-title'>
                Habitats
                <button className='add-habitat-btn' onClick={() => setShowForm(true)}>
                    Add habitat
                </button>
            </div>
            {showForm && <AddHabitatForm setShowForm={setShowForm} loadHabitats={loadHabitats} />}
            <HabitatsList habitats={habitats} loadHabitats={loadHabitats}/>
        </div>
    )
}

export default HabitatsPage