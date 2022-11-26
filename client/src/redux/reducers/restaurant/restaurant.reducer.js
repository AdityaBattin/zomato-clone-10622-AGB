import { GET_RESTAURANT, GET_SPECIFY_RESTAURANT } from "./restaurant.type";

const initialstate = {
    restaurants: [],
    selectedRestaurant: {},
}

const restaurantReducer = (state = initialstate, action) => {
    switch (action.type) {
        case GET_RESTAURANT:
            return {
                ...state,
                restaurants: [...action.payload],
            }
        case GET_SPECIFY_RESTAURANT:
            return {
                ...state,
                selectedRestaurant: { ...action.payload },
            }
        default:
            return {
                ...state,
            }
    }
}

export default restaurantReducer;

