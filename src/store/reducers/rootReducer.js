import {combineReducers} from "redux";
import quizReducer from "./quiz.reducer";
import createQuizReducer from "./create-quiz.reducer";
import authReducer from "./auth.reducer";

export default combineReducers({
    quiz: quizReducer,
    createQuiz: createQuizReducer,
    auth: authReducer
})
