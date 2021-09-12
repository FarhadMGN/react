import React from 'react'
import './answer-item.css'

const AnswerItem = props => {
    const classes = ["AnswerItem"]
    if (props.state) {
        classes.push(props.state);
        console.log("1jhjh", classes.join(" "));
    }
    return (
        <li className={classes.join(" ")}
        onClick={() => props.onAnswerClick(props.answer.id)}>
            { props.answer.text }
        </li>
    )
}

export default AnswerItem;
