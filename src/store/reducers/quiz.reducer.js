import {FETCH_QUIZES_START, FETCH_QUIZES_SUCCESS, FETCH_QUIZES_FAILURE} from "../actions/actionTypes";

const initialState = {
    quizes: [],
    isLoading: false,
    error: null
};

export default function quizReducer(state=initialState, action) {
    switch (action.type) {
        case FETCH_QUIZES_START:
            return {
                ...state,
                isLoading: true
            };
        case FETCH_QUIZES_SUCCESS:
            return {
                ...state,
                quizes: action.payload,
                isLoading: false
            };
        case FETCH_QUIZES_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload
            };
        default:
            return state
    }
}
