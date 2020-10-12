const express = require('express')
const app = express()
const cors = require('cors')
const db = require('./db')

app.use(express.json())
app.use(cors())


//ROUTES//
app.get('/api/v1/restaurants', async (req, res) => {
    try {
        const results = await db.query('SELECT * FROM restaurants')
        res.status(200).json({
            status: 'success',
            results: results.rows.length,
            data: {
               restaurants: results.rows 
            }
        })
    } catch (error) {
        console.log(error)
    }
})


app.get('/api/v1/restaurants/:id', async (req, res) => {
    try {
        const restaurant = await db.query('SELECT * FROM restaurants WHERE id = $1', [req.params.id])
        
        const reviews = await db.query('SELECT * FROM reviews WHERE restaurant_id = $1', [req.params.id])
        res.status(200).json({
            status: 'success',
            results: restaurant.rows.length,
            data: {
               restaurant: restaurant.rows[0],
               reviews: reviews.rows
            }
        })
    } catch (error) {
        res.send(error.message)
    }
})

app.post('/api/v1/restaurants', async (req, res) => {
    try {
        const results = await db.query("INSERT INTO restaurants (name, location, price_range) values ($1, $2, $3) returning *", [
            req.body.name,
            req.body.location,
            req.body.price_range
        ])
        console.log(results)
        res.status(200).json({
            status: 'success',
            results: results.rows.length,
            data: {
               restaurant: results.rows[0]
            }
        })
    } catch (error) {
        res.send(error.message)
    }
})

app.put('/api/v1/restaurants/:id', async (req, res) => {
    try {
        const results = await db.query("UPDATE restaurants SET name = $1, location = $2, price_range = $3 WHERE id = $4 returning *", [
            req.body.name,
            req.body.location,
            req.body.price_range,
            req.params.id
        ])
        console.log(results)
        res.status(200).json({
            status: 'success',
            results: results.rows.length,
            data: {
               restaurant: results.rows[0]
            }
        })
    } catch (error) {
        res.send(error.message)
    }
})

app.delete('/api/v1/restaurants/:id', async (req, res) => {
    try {
        const results = await db.query("DELETE FROM restaurants WHERE id = $1 returning *", [
            req.params.id
        ])
        res.status(200).json({
            status: 'success',
            results: results.rows.length,
            data: {
               restaurant: results.rows[0]
            }
        })
    } catch (error) {
        res.send(error.message)
    }
})

app.post('/api/v1/restaurants/:id/addReview', async (req, res) => {
    try {
        const newReview = await db.query("INSERT INTO reviews (restaurant_id, name, review, rating) values ($1, $2, $3, $4) returning *", 
            [req.params.id, req.body.name, req.body.review, req.body.rating]
        )
        res.status(201).json({
            status: 'success',
            data: {
                review: newReview.rows[0]
            }
        })
    } catch (error) {
        res.send(error.message)
        
    }
})

const port = process.env.PORT || 5000
app.listen(port, () => {
    console.log(`server is running on port ${port}`)
})