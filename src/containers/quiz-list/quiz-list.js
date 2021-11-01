import React, {Component} from 'react'
import classes from './quiz-list.module.css'
import {NavLink} from "react-router-dom";
import axios from "../../axios/axios-quiz";
import Loader from "../../components/UI/loader/loader";


export default class QuizListComponent extends Component {
    state = {
        quizes: [],
        isLoading: true
    };
    renderQuizes() {
        return this.state.quizes.map((quiz) => {
            return (
                <li
                    key={quiz.id}
                >
                    <NavLink
                        to={"/quiz/" + quiz.id}
                    >
                        {quiz.name}
                    </NavLink>
                </li>
            )
        })
    }

    async componentDidMount() {
        try {
            this.setState({
                isLoading: true
            });
            const response = await axios.get('/quizes.json');
            console.log('data', response.data);
            const quizes = [];
            Object.keys(response.data).forEach((key, idx) => {
                quizes.push({
                    id: key,
                    name: `Test №${idx + 1}`
                })
            });
            this.setState({
                quizes,
                isLoading: false
            });
        } catch (e) {
            this.setState({
                quizes: [],
                isLoading: false
            });
        }
    };

    render() {
        return (
            <div className={classes.QuizList}>
                <div>
                    <h1>Quiz List</h1>
                    { this.state.isLoading ? <Loader/> :
                        <ul>
                            {this.renderQuizes()}
                        </ul>
                    }
                </div>
            </div>
        )
    }
}
