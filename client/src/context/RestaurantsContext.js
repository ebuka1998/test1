import React, {useState, createContext} from 'react'

export const RestaurantsContext = createContext()

export const RestaurantContextProvider = props => {

    const [restaurants, setRestaurants] = useState([])
    const [selectedRestaurants, setSelectedRestaurants] = useState({})

    const addRestaurants = (restaurant) => {
        setRestaurants([...restaurants, restaurant])
    }

    return(
        <RestaurantsContext.Provider 
            value = {{
                restaurants: restaurants, 
                selectedRestaurants: selectedRestaurants,

                setRestaurants, 
                addRestaurants,
                setSelectedRestaurants
            }}
        
        >
            {props.children}
        </RestaurantsContext.Provider>
    )
}
