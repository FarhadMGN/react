import React, {Component} from 'react'
import classes from './Quiz.module.css'
import ActiveQuiz from "../../components/active-quiz/active-quiz";
import FinishedQuiz from "../../components/finisfed-quiz/finisfed-quiz";
import axios from "../../axios/axios-quiz";
import Loader from "../../components/UI/loader/loader";

class Quiz extends Component {
    state = {
        results: {},
        isFinished: false,
        activeQuestion: 0,
        answerState: null,
        quiz: [],
        isLoading: true,
    };

    isQuizFinished() {
        return this.state.activeQuestion + 1 === this.state.quiz?.length;
    };

    async componentDidMount() {
        console.log('quiz id', this.props.match.params.id);
        try {
            const response = await axios.get(`/quizes/${this.props.match.params.id}.json`);
            const quiz = response.data;
            this.setState({
               quiz,
               isLoading: false
            })
        } catch (e) {
            this.setState({
                quiz: [],
                isLoading: false
            })
        }
    }

    onAnswerClickHandler = answer => {
        if (this.state.answerState) {
            const key = Object.keys(this.state.answerState)[0];
            if (this.state.answerState[key] === "success") {
                return;
            }
        }
        const question = this.state.quiz[this.state.activeQuestion];
        const results = this.state.results;

        if (answer === question.rightAnswerId) {
            if (!results[question.id]) {
                results[question.id] = 'success';
            }
            this.setState({
                answerState: {[answer]: "success"},
                results
            });
            const timeout = window.setTimeout(() => {
                if (this.isQuizFinished()) {
                    this.setState({
                        isFinished: true
                    })
                } else {
                    this.setState({
                        activeQuestion: this.state.activeQuestion + 1,
                        answerState: null
                    });
                }


                window.clearTimeout(timeout);
            }, 1000);

        } else {
            results[question.id] = 'error';
            this.setState({
                answerState: {[answer]: "error"},
                results
            });
        }

    };

    onRetry = () => {
        this.setState({
            results: {},
            isFinished: false,
            activeQuestion: 0,
            answerState: null,
        })
    };

    render() {

        return (
            <div className={classes.Quiz}>
                <div className={classes.QuizWrapper}>
                    <h1>Fill all questions !</h1>
                    {
                        this.state.isLoading ?
                            <Loader/> :
                            this.state.isFinished ?
                                <FinishedQuiz
                                    results={this.state.results}
                                    quiz={this.state.quiz}
                                    onRetry={this.onRetry}
                                /> :
                                <ActiveQuiz answers={this.state.quiz[this.state.activeQuestion].answers}
                                            question={this.state.quiz[this.state.activeQuestion].question}
                                            onAnswerClick={this.onAnswerClickHandler}
                                            quizLength={this.state.quiz?.length}
                                            answerNumber={this.state.activeQuestion + 1}
                                            state={this.state.answerState}
                                />
                    }
                </div>
            </div>
        );
    }
}

export default Quiz
