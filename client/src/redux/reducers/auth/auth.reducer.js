import { SIGN_UP, SIGN_IN, GOOGLE_AUTH, SIGN_OUT } from "./auth.type";

const initialstate = {};

const authreducer = (state = initialstate, action) => {
    switch (action.type) {
        case SIGN_IN:
            return {
                ...state,
                ...action.payload,
            };
        case SIGN_UP:
            return {
                ...state,
                ...action.payload,
            };
        case SIGN_OUT:
            return {};
        case GOOGLE_AUTH:
            return {
                ...state,
                ...action.payload,
            };
        default:
            return {
                ...state,
            }
    }
}

export default authreducer;
