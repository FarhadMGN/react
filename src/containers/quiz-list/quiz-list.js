import React, {Component} from 'react'
import classes from './quiz-list.module.css'
import {NavLink} from "react-router-dom";
import Loader from "../../components/UI/loader/loader";
import {connect} from "react-redux";
import {fetchQuizes} from "../../store/actions/quiz.action";


class QuizListComponent extends Component {
    renderQuizes() {
        return this.props.quizes.map((quiz) => {
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

    componentDidMount() {
        this.props.fetchQuizes();
    };

    render() {
        return (
            <div className={classes.QuizList}>
                <div>
                    <h1>Quiz List</h1>
                    { this.props.isLoading ? <Loader/> :
                        <ul>
                            {this.renderQuizes()}
                        </ul>
                    }
                </div>
            </div>
        )
    }
}

//will trigger every time when state change
//in the component is possible to use this.props.quizes(isLoading)
function mapStateToProps(state) {
    return {
        quizes: state.quiz.quizes,
        isLoading: state.quiz.isLoading
    }
}

//this function forwards in component some methods to store updating, to avoid dispatch methods call directly from component
function mapDispatchToProps(dispatch) {
    return {
        fetchQuizes: () => dispatch(fetchQuizes())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuizListComponent)
