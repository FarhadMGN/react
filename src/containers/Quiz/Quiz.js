import React, {Component} from 'react'
import classes from './Quiz.module.css'
import ActiveQuiz from "../../components/active-quiz/active-quiz";
import FinishedQuiz from "../../components/finisfed-quiz/finisfed-quiz";
import Loader from "../../components/UI/loader/loader";
import {connect} from "react-redux";
import {fetchQuizById, quizAnswerClick, retryQuiz} from "../../store/actions/quiz.action";

class Quiz extends Component {

    componentDidMount() {
        console.log('quiz id', this.props.match.params.id);
        this.props.fetchQuizByIdHere(this.props.match.params.id);
    }

    componentWillUnmount() {
        this.props.retryQuiz();
    }

    onAnswerClickHandler = answer => {
        this.props.changeAnswerState(answer);
    };

    onRetry = () => {
        this.props.retryQuiz();
    };

    render() {

        return (
            <div className={classes.Quiz}>
                <div className={classes.QuizWrapper}>
                    <h1>Fill all questions !</h1>
                    {
                        this.props.isLoading || this.props.quiz.length === 0 ?
                            <Loader/> :
                            this.props.isFinished ?
                                <FinishedQuiz
                                    results={this.props.results}
                                    quiz={this.props.quiz}
                                    onRetry={this.onRetry}
                                /> :
                                <ActiveQuiz answers={this.props.quiz[this.props.activeQuestion].answers}
                                            question={this.props.quiz[this.props.activeQuestion].question}
                                            onAnswerClick={this.onAnswerClickHandler}
                                            quizLength={this.props.quiz?.length}
                                            answerNumber={this.props.activeQuestion + 1}
                                            state={this.props.answerState}
                                />
                    }
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        results: state.quiz.results,
        isFinished: state.quiz.isFinished,
        activeQuestion: state.quiz.activeQuestion,
        answerState: state.quiz.answerState,
        quiz: state.quiz.quiz,
        isLoading: state.quiz.isLoading
    }
}

function mapDispatchToProps(dispatch) {
    return {
        fetchQuizByIdHere: (id) => dispatch(fetchQuizById(id)),
        changeAnswerState: (answerId) => dispatch(quizAnswerClick(answerId)),
        retryQuiz: () => dispatch(retryQuiz())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Quiz)
