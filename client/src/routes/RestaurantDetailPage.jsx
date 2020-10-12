import React, {useEffect, useContext} from 'react'
import {useParams} from 'react-router-dom'
import { RestaurantsContext } from '../context/RestaurantsContext';
import axios from 'axios'
//import StarRating from '../components/StarRating';
import Reviews from '../components/Reviews';
import AddReviews from '../components/AddReviews';


const RestaurantDetailPage = () => {
    const {id} = useParams()
    const {selectedRestaurants, setSelectedRestaurants} = useContext(RestaurantsContext)
    
    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get(`http://localhost:5000/api/v1/restaurants/${id}`)
            setSelectedRestaurants(response.data.data)
        }
        fetchData()
    }, [])

    return (
        <div className='container'>
            {selectedRestaurants && (
                <>
                <h1>{selectedRestaurants.restaurant && selectedRestaurants.restaurant.name}</h1>
                    <div className="mt-3">
                        <Reviews reviews={selectedRestaurants.reviews && selectedRestaurants.reviews}/>
                    </div>
                    <AddReviews/>
                </>
            )}
        </div>
    )
}

export default RestaurantDetailPage
