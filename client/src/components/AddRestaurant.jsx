import React, {useState, useContext} from 'react'
import axios from 'axios'
import { RestaurantsContext } from '../context/RestaurantsContext';
const AddRestaurant = () => {
    const [name, setName] = useState('')
    const [location, setLocation] = useState('')
    const [priceRange, setPriceRange] = useState('Price Range')
    
    const {addRestaurants} = useContext(RestaurantsContext)
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post('http://localhost:5000/api/v1/restaurants', {
                name: name,
                location: location,
                price_range: priceRange
            })
            addRestaurants(response.data.data.restaurant)
        } catch (error) {
            console.log(error.message);
        }
    }
    
    return (
        <div className='mb-4'>
            <form action="">
                <div className="form-row">
                    <div className="col">
                        <input value = {name} onChange = {e => setName(e.target.value)} type="text" placeholder='name' className='form-control'/>
                    </div>

                    <div className="col">
                        <input value = {location} onChange = {e => setLocation(e.target.value)} type="text" placeholder='location' className='form-control'/>
                    </div>

                    <div className="col">
                       <select name="" value = {priceRange} onChange = {e => setPriceRange(e.target.value)} className='custom-select my-1 mr-sm-2' id="">
                           <option disabled>Price Range</option>
                           <option value="1">$</option>
                           <option value="2">$$</option>
                           <option value="3">$$$</option>
                           <option value="4">$$$$</option>
                           <option value="5">$$$$$</option>
                       </select>
                    </div>
                    <button type='submit' className="btn btn-primary" onClick={handleSubmit}>Add</button>
                </div>
            </form>
        </div>
    )
}

export default AddRestaurant
