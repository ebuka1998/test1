import React, {useState, useEffect, useContext} from 'react'
import {useParams, useHistory} from 'react-router-dom'
import axios from 'axios';

const UpdateRestaurant = (props) => {
    let history = useHistory()
    const {id} = useParams()
    const [name, setName] = useState('')
    const [location, setLocation] = useState('')
    const [priceRange, setPriceRange] = useState('')

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get(`http://localhost:5000/api/v1/restaurants/${id}`)
            setName(response.data.data.restaurant.name)
            setLocation(response.data.data.restaurant.location)
            setPriceRange(response.data.data.restaurant.price_range)
        }
        fetchData()
       
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const updatedRestaurant = await axios.put(`http://localhost:5000/api/v1/restaurants/${id}`, {
                name: name,
                location: location,
                price_range: priceRange
            })
            history.push('/')
        } catch (error) {
            console.log(error.message);
        }
    }
    return (
        <div>
            <form action="">
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input value = {name} onChange = {e => setName(e.target.value)} type="text" id='name' className='form-control'/>
                </div>

                <div className="form-group">
                    <label htmlFor="location">Location</label>
                    <input value = {location} onChange = {e => setLocation(e.target.value)} type="text" id='location' className='form-control'/>
                </div>

                <div className="form-group">
                    <label htmlFor="price_range">Price Range</label>
                    <input value = {priceRange} onChange = {e => setPriceRange(e.target.value)} type="number" id='price_range' className='form-control'/>
                </div>

                <button type='submit' onClick={handleSubmit} className="btn btn-primary">Update</button>
            </form>
        </div>
    )
}

export default UpdateRestaurant
