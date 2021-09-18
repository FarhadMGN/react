import React from 'react'
import classes from './answers-list.module.css'
import AnswerItem from "./answer-item/answer-item";

const AnswersList = props => (
    <ul className={classes.AnwsersList}>
        { props.answers.map((answer, index) => {
            return (
                <AnswerItem
                    state={props.state ? props.state[answer.id] : null}
                    onAnswerClick={props.onAnswerClick}
                    key={index}
                    answer={answer}/>
            )
        })}
    </ul>
)

export default AnswersList;
