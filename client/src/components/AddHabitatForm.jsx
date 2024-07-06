import { useState } from 'react'
import axios from '../api/axios';

const AddHabitatForm = ({ setShowForm, loadHabitats }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    const createHabitat = async (token) => {
        await axios.post('/habitats/create', 
            JSON.stringify({ name, description }), 
            {
                headers: { 'Authorization': `Bearer ${token}` }
            }
        ) 
        loadHabitats()
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        let token = localStorage.getItem('accessToken')
        try {
            await createHabitat(token)
        } catch (err) {
            if (err.response.status === 400) alert(`${err.response.data.message}`)
            if (err.response.status === 401) {
                const response = await axios.post('/refresh-token')
                localStorage.setItem('accessToken', response.data.accessToken)
                token = localStorage.getItem('accessToken')
                createHabitat(token)
            }
        }

        setShowForm(false)
        setName('')
        setDescription('')
        loadHabitats()
    }

    return (
        <div className='add-habitat-container'>
            <div className='add-habitat-wrapper'>
                <form onSubmit={handleSubmit}>
                    <div className='add-habitat-text'>Add habitat</div>
                    <div className='input-box'>
                        <input 
                            type='text'
                            placeholder='Habitat Name' 
                            value={name} 
                            onChange={(e) => setName(e.target.value)} 
                            required 
                        />
                    </div>
                    <div className='input-box'>
                        <input 
                            placeholder='Habitat Description' 
                            value={description} 
                            onChange={(e) => setDescription(e.target.value)} 
                            required 
                        />
                    </div>
                    <div className='buttons'>
                        <button className='create-habitat-btn' type='submit'>Create Habitat</button>
                        <button className='cancel-create-btn' onClick={() => setShowForm(false)}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddHabitatForm