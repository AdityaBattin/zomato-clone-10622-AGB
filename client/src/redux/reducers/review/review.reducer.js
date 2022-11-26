import { GET_REVIEW, POST_REVIEW } from "./review.type";

const initialState = {
  reviews: {
    reviews: [],
  }
  // reviews: [],

};

const reviewReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_REVIEW:
      return {
        ...state,
        // reviews: {
        //   reviews: [...action.payload]
        // }
        reviews: action.payload
      };
    case POST_REVIEW:
      return {
        ...state,
        reviews: {
          reviews: [action.payload, ...state.reviews.reviews]
        }
        // reviews:[action.payload,...state.reviews]
      };
    default:
      return {
        ...state,
      };
  }
};

export default reviewReducer;
