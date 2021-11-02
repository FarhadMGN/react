import {ADD_NEW_QUESTION, FINISH_CREATE_QUIZ, FINISH_CREATE_QUIZ_SUCCESS, FINISH_CREATE_QUIZ_FAILURE} from "./actionTypes";
import axios from "../../rest/axios-quiz";

export function createQuizQuestion(question) {
    return {
        type: ADD_NEW_QUESTION,
        payload: question
    }
}

export function finishCreateQuiz() {
    return async (dispatch, getState) => {
        try {
            const response = await axios.post('/quizes.json', getState().createQuiz.quiz);
            dispatch(finishCreateQuizSuccess())
        } catch (e) {
            dispatch(finishCreateQuizFailure())
        }

    }
}

export function finishCreateQuizSuccess() {
    return {
        type: FINISH_CREATE_QUIZ_SUCCESS,
    }
}

export function finishCreateQuizFailure() {
    return {
        type: FINISH_CREATE_QUIZ_FAILURE,
    }
}
