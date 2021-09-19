import React, {Component} from 'react'
import classes from './quiz-list.module.css'
import {NavLink} from "react-router-dom";


export default class QuizListComponent extends Component {
    renderQuizes() {
        return [1, 2, 3].map((quiz, idx) => {
            return (
                <li
                    key={idx}
                >
                    <NavLink
                        to={"/quiz/" + quiz}
                    >
                        Test {quiz}
                    </NavLink>
                </li>
            )
        })
    }
    render() {
        return (
            <div className={classes.QuizList}>
                <div>
                    <h1>Quiz List</h1>
                    <ul>
                        {this.renderQuizes()}
                    </ul>

                </div>
            </div>
        )
    }
}
