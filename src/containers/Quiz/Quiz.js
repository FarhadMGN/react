import React, {Component} from 'react'
import classes from './Quiz.module.css'
import ActiveQuiz from "../../components/active-quiz/active-quiz";
import FinishedQuiz from "../../components/finisfed-quiz/finisfed-quiz";
console.log('classes!!!!', classes);
class Quiz extends Component {
    state = {
        results: {},
        isFinished: false,
        activeQuestion: 0,
        answerState: null,
        quiz: [
            {
                id: 1,
                question: "sky color is ...?",
                rightAnswerId: 1,
                answers: [
                    {text: "black", id: 1},
                    {text: "red", id: 2},
                    {text: "green", id: 3}
                ]
            },
            {
                id: 2,
                question: "St. Peterburg build year is ...?",
                rightAnswerId: 1,
                answers: [
                    {text: "1703", id: 1},
                    {text: "1998", id: 2},
                    {text: "1503", id: 3}
                ]
            }
        ]
    };

    isQuizFinished() {
        return this.state.activeQuestion + 1 === this.state.quiz?.length;
    };

    componentDidMount() {
        console.log('quiz id', this.props.match.params.id)
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
