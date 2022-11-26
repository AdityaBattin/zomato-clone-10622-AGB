import axios from "axios";

import { GET_RESTAURANT, GET_SPECIFY_RESTAURANT } from "./restaurant.type";

export const getrestaurant = () => async (dispatch) => {
    try {
        const restaurantlist = await axios({
            method: "GET",
            url: "http://localhost:4000/restaurant?city=NCR"
        });

        return dispatch({ type: GET_RESTAURANT, payload: restaurantlist.data.restaurants });
    } catch (error) {
        return dispatch({ type: "ERROR", payload: error });
    }
}

export const getspecificrestaurant = (_id) => async (dispatch) => {
    try {
        const restaurantlist = await axios({
            method: "GET",
            url: `http://localhost:4000/restaurant/${_id}`
        });

        return dispatch({ type: GET_SPECIFY_RESTAURANT, payload: restaurantlist.data });
    } catch (error) {
        return dispatch({ type: "ERROR", payload: error });
    }
}