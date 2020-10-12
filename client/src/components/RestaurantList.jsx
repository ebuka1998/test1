import React, {useEffect, useContext} from 'react'
import axios from 'axios'
import { RestaurantsContext } from '../context/RestaurantsContext';
import {useHistory} from 'react-router-dom'
const RestaurantList = (props) => {
    const {restaurants, setRestaurants} = useContext(RestaurantsContext)
    let history = useHistory()

    useEffect(() => {
        get()
    }, [])

    const get = async () => {
        try {
            const result = await axios.get('http://localhost:5000/api/v1/restaurants')
            setRestaurants(result.data.data.restaurants)
        } catch (error) {
            console.log(error.message);
        }
    }

    const handleDelete = async (e, id) => {
        e.stopPropagation()
        try {
            const response = await axios.delete(`http://localhost:5000/api/v1/restaurants/${id}`)
            setRestaurants(restaurants.filter(restaurant => {
                return restaurant.id !== id
            }))
        } catch (error) {
            console.log(error.message);
        }
    }

    const handleUpdate = (e, id) => {
        e.stopPropagation()
        history.push(`/restaurants/${id}/update`)
    }

    const handleRestaurantSelect = (id) => {
        history.push(`/restaurants/${id}`)
    }

    return (
        <div  className='list-group'>
            <table className="table-hover table-dark">
                <thead>
                    <tr className="bg-primary">
                        <th scope='col'>Restaurant</th>
                        <th scope='col'>Location</th>
                        <th scope='col'>Price Range</th>
                        <th scope='col'>Rating</th>
                        <th scope='col'>Edit</th>
                        <th scope='col'>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {restaurants && restaurants.map(restaurant => (
                        <tr onClick={() => handleRestaurantSelect(restaurant.id)} key={restaurant.id}>
                            <td>{restaurant.name}</td>
                            <td>{restaurant.location}</td>
                            <td>{"$".repeat(restaurant.price_range)}</td>
                            <td>reviews</td>
                            <td><button onClick = {(e) => handleUpdate(e, restaurant.id)} className="btn btn-warning">Update</button></td>
                            <td><button onClick = {(e) => handleDelete(e, restaurant.id)} className="btn btn-danger">Delete</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default RestaurantList
