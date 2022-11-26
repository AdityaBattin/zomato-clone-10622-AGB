import axios from 'axios';

import { SIGN_OUT, SIGN_IN, SIGN_UP, GOOGLE_AUTH } from './auth.type';

export const signin = (userData) => async (dispatch) => {
    try {
        const User = await axios({
            method: "POST",
            url: "http://localhost:4000/auth/signin",
            data: { credentials: userData }
        });

        localStorage.setItem("zomatoUser", JSON.stringify({ tokens: User.data.tokens }));

        axios.defaults.headers.common[
            "Authorization"
        ] = `Bearer ${User.data.tokens}`;

        return dispatch({ type: SIGN_IN, payload: User.data });
    } catch (error) {
        return dispatch({ type: "ERROR", payload: error });
    }
}

export const signup = (userData) => async (dispatch) => {
    try {
        const User = await axios({
            method: "POST",
            url: "http://localhost:4000/auth/signup",
            data: { credentials: userData },
        });

        localStorage.setItem("zomatoUser", JSON.stringify({ tokens: User.data.tokens }));

        axios.defaults.headers.common[
            "Authorization"
        ] = `Bearer ${User.data.tokens}`;

        // window.location.reload();

        return dispatch({ type: SIGN_UP, payload: User.data });
    } catch (error) {
        return dispatch({ type: "ERROR", payload: error });
    }
}

export const signout = () => async (dispatch) => {
    try {
        localStorage.removeItem("zomatoUser");

        return dispatch({ type: SIGN_OUT, payload: {} });
    } catch (error) {
        return dispatch({ type: "ERROR", payload: error });
    }
}

export const googleauth = (token) => async (dispatch) => {
    try {
        localStorage.setItem("zomatoUser", JSON.stringify({ token }));
        axios.defaults.headers.common[
            "Authorization"
        ] = `Bearer ${token}`;

        return dispatch({ type: GOOGLE_AUTH, playload: { token } });
    } catch (error) {
        return dispatch({ type: "ERROR", payload: error });
    }
}