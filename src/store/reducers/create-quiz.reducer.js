import {ADD_NEW_QUESTION, FINISH_CREATE_QUIZ, FINISH_CREATE_QUIZ_FAILURE, FINISH_CREATE_QUIZ_SUCCESS} from "../actions/actionTypes";

const initialState = {
    quiz: [],

};

export default function createQuizReducer(state=initialState, action) {
    switch (action.type) {
        case ADD_NEW_QUESTION:
            return {
                ...state,
                quiz: [...state.quiz, action.payload]
            };
        case FINISH_CREATE_QUIZ_SUCCESS:
        case FINISH_CREATE_QUIZ_FAILURE:
            return {
                ...state,
                quiz: []
            };
        default:
            return state;
    }
}
