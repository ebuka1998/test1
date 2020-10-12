import React, {useState} from 'react'
import axios from 'axios'
import { useHistory, useLocation, useParams } from 'react-router-dom'

const AddReviews = () => {
    const {id} = useParams()
    const location = useLocation()
    const history = useHistory()
    const [name, setName] = useState('')
    const [rating, setRating] = useState('')
    const [reviews, setReviews] = useState('')

    const handleSubmitReview = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post(`http://localhost:5000/api/v1/restaurants/${id}/addReview`, {
                name,
                review: reviews,
                rating
            })
            history.push('/')
            history.push(location.pathname)
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div className='mb-2'>
            <form action="">
                <div className="form-row">
                    <div className="form-group col-8">
                        <label htmlFor="name">Name</label>
                        <input value={name} onChange={(e) => setName(e.target.value)} id='name' placeholder='name' type="text" className='form-control'/>
                    </div>
                    <div className="form-group col-4">
                        <label htmlFor="rating">rating</label>
                        <select value={rating} onChange={(e) => setRating(e.target.value)} name="" id="rating" className="custom-select">
                            <option disabled>Rating</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="Review">Reviews</label>
                    <textarea value={reviews} onChange={(e) => setReviews(e.target.value)} id="Review"  className='form-control'></textarea>
                </div>
                <button onClick={handleSubmitReview} className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default AddReviews
