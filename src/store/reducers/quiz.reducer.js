import {
    FETCH_QUIZES_START,
    FETCH_QUIZES_SUCCESS,
    FETCH_QUIZES_FAILURE,
    FETCH_QUIZ_SUCCESS,
    FETCH_QUIZ_FAILURE,
    QUIZ_SET_STATE, FINISH_QUIZ, QUIZ_NEXT_QUESTION, RETRY_QUIZ
} from "../actions/actionTypes";

const initialState = {
    quizes: [],
    isLoading: false,
    error: null,
    //quiz
    results: {},
    isFinished: false,
    activeQuestion: 0,
    answerState: null,
    quiz: [],

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
        case FETCH_QUIZ_SUCCESS:
            return {
                ...state,
                quiz: action.payload,
                isLoading: false
            };
        case FETCH_QUIZ_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload
            };
        case QUIZ_SET_STATE:
            return {
                ...state,
                answerState: action.answerState,
                results: action.results
            };
        case FINISH_QUIZ:
            return {
                ...state,
                isFinished: true,
            };
        case QUIZ_NEXT_QUESTION:
            return {
                ...state,
                activeQuestion: action.activeQuestion,
                answerState: null
            };
        case RETRY_QUIZ:
            return {
                ...state,
                results: {},
                isFinished: false,
                activeQuestion: 0,
                answerState: null,
            };
        default:
            return state
    }
}
