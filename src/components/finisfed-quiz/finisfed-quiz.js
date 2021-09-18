import React from 'react'
import classes from "./finisfed-quiz.module.css"
import Button from "../UI/button/button";

const FinishedQuiz = props => {
    const successCount = Object.keys(props.results).reduce((total, key) => {
        if (props.results[key] === 'success') {
            total++;
        }
        return total;
    }, 0);
    return (
        <div className={classes.FinishedQuiz}>
            <ul>
                { props.quiz.map((question, index) => {
                    const cls = [
                        'fa',
                        props.results[question.id] === 'error' ? 'fa-times' : 'fa-check',
                        props.results[question.id] === 'error' ? classes.error : classes.success,
                    ];
                    return (
                        <li key={index}>
                            <strong>{index + 1}.</strong>&nbsp;
                            { question.question }
                            <i className={cls.join(' ')}></i>
                        </li>
                    )

                })}
            </ul>

            <p>Right answers number {successCount} from {props.quiz.length}</p>
            <div>
                <Button
                    type='primary'
                    onClick={props.onRetry}
                >
                    Repeat
                </Button>
                <Button
                    type='success'
                    onClick={props.onRetry}
                >
                    Go to test List
                </Button>
            </div>
        </div>
    )
}

export default FinishedQuiz
