import React from 'react'
import './active-quiz.css'
import AnswersList from "./answers-list/ansers-list";

const ActiveQuiz = props =>  (
    <div className="ActiveQuiz">
        <p className="Question">
            <span>
                <strong>{props.answerNumber}</strong>&nbsp;
                { props.question }
            </span>
            <small> {props.answerNumber} from {props.quizLength}</small>
        </p>

       <AnswersList answers={props.answers}
                    onAnswerClick={props.onAnswerClick}
                    state={props.state}
       />
    </div>
    )

export default ActiveQuiz
