import { useState, useEffect } from 'react'
import HabitatsList from '../components/HabitatsList'
import '../style/HabitatsPage.css'

const HabitatsPage = () => {
    const [habitats, setHabitats] = useState([])
    const [showForm, setShowForm] = useState(false);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

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

    useEffect(() => {
        loadHabitats()
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();

        let token = localStorage.getItem('accessToken')
        await fetch('http://localhost:5234/api/habitats/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            credentials: 'include',
            body: JSON.stringify({ name, description })
        })
            .then(res => res.json())
            .then(data => {
                if (data.message === `Habitat ${name} already exists!`) {
                    alert(`${data.message}`)
                }
            })

        loadHabitats()

        setShowForm(false)
        setName('')
        setDescription('')
    }

    return (
        <div className='habitats-container'>
            <div className="habitats-title">
                Habitats
                <button className='add-habitat-btn' onClick={() => {
                    setShowForm(true);
                }}>Add habitat</button>
            </div>
            {showForm && (
                <div className='add-habitat-container'>
                    <div className='add-habitat-wrapper'>
                        <form onSubmit={handleSubmit}>
                            <div className='add-habitat-text'>Add habitat</div>
                            <div className="input-box">
                                <input 
                                    type="text" 
                                    placeholder="Habitat Name" 
                                    value={name} 
                                    onChange={(e) => setName(e.target.value)} 
                                    required 
                                />
                            </div>
                            <div className="input-box">
                                <input 
                                    placeholder="Habitat Description" 
                                    value={description} 
                                    onChange={(e) => setDescription(e.target.value)} 
                                    required 
                                />
                            </div>
                            <div className="buttons">
                                <button className='create-habitat-btn' type="submit">Create Habitat</button>
                                <button className='cancel-create-btn' onClick={() => setShowForm(false)}>Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
            <HabitatsList habitats={habitats} loadHabitats={loadHabitats}/>
        </div>
    )
}

export default HabitatsPage