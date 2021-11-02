import axios from "../../rest/axios-quiz";
import {FETCH_QUIZES_FAILURE, FETCH_QUIZES_SUCCESS, FETCH_QUIZES_START} from './actionTypes'

export function fetchQuizes() {
    return async dipatch => {
        dipatch(fetchQuizesStart());
        try {
            const response = await axios.get('/quizes.json');
            const quizes = [];
            Object.keys(response.data).forEach((key, idx) => {
                quizes.push({
                    id: key,
                    name: `Test №${idx + 1}`
                })
            });
            dipatch(fetchQuizesSuccess(quizes))
        } catch (e) {
            dipatch(fetchQuizesFailure(e))
        }
    }
}

export function fetchQuizesStart() {
    return {
        type: FETCH_QUIZES_START
    }
}

export function fetchQuizesSuccess(quizes) {
    return {
        type: FETCH_QUIZES_SUCCESS,
        payload: quizes
    }
}

export function fetchQuizesFailure(error) {
    return {
        type: FETCH_QUIZES_FAILURE,
        payload: error
    }
}
