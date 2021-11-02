import React, {Component} from 'react'
import classes from './quiz-creator.module.css'
import Button from "../../components/UI/button/button";
import {createControl, validate, validateForm} from "../../form/form-helper"
import Input from "../../components/UI/input/input";
import Select from "../../components/UI/select/select";
import axios from "../../rest/axios-quiz";
import {connect} from "react-redux";
import {createQuizQuestion, finishCreateQuiz} from "../../store/actions/create-quiz.action";

function createFormControls() {
    return {
        question: createControl({
                label: "Type cuestion",
                errorMessage: "Fill question"
            }, {required: true}
        ),
        option1: createOptionControl(1),
        option2: createOptionControl(2),
        option3: createOptionControl(3),
        option4: createOptionControl(4),
    }
}
function createOptionControl(number) {
    return createControl({
            label: `Answer ${number}`,
            errorMessage: "Field is empty :(",
            id: number,
        }, {required: true}
    )
}

class QuizCreatorComponent extends Component {

    state = {
        rightAnswerId: 1,
        isFormValid: false,
        formControls: createFormControls()
    };

    submitHandler = event => {
        event.preventDefault();
    };

    addQuestionHandler = event => {
        event.preventDefault();

        const {question, option1, option2, option3, option4} = this.state.formControls;

        const questionItem = {
            question: question.value,
            id: this.props.quiz.length + 1,
            rightAnswerId: this.state.rightAnswerId,
            answers: [
                {
                    text: option1.value,
                    id: option1.id
                },
                {
                    text: option2.value,
                    id: option2.id
                },
                {
                    text: option3.value,
                    id: option3.id
                },
                {
                    text: option4.value,
                    id: option4.id
                },
            ]

        };
        this.props.createQuizQuestion(questionItem);
        this.setState({
            rightAnswerId: 1,
            isFormValid: false,
            formControls: createFormControls()
        })
    };
    CreateQuizHandler = (event) => {
        event.preventDefault();
        console.log('1', this.props.quiz);
        this.props.finishCreateQuiz();
        console.log('2', this.props.quiz);
        this.setState({
            rightAnswerId: 1,
            isFormValid: false,
            formControls: createFormControls()
        })
    };

    changeHandler(value, controlName) {
        console.log(controlName, value);

        const formControls = { ...this.state.formControls };
        const control = { ...formControls[controlName]};

        control.touched = true;
        control.value = value;

        control.valid = validate(control.value, control.validation);

        formControls[controlName] = control;
        this.setState({
            formControls,
            isFormValid: validateForm(formControls)
        })
    }

    selectChangeHandler = event => {
        this.setState({
            rightAnswerId: +event.target.value
        })
    };

    renderInputs() {
        const inputs = Object.keys(this.state.formControls).map((controlName, idx) => {
            const control = this.state.formControls[controlName];
            return (
                <div key={idx}>
                    <Input
                        type={control.type}
                        value={control.value}
                        touched={control.touched}
                        label={control.label}
                        shouldValidate={!!control.validation}
                        errorMessage={control.errorMessage}
                        valid={control.valid}
                        onChange={event => this.changeHandler(event.target.value, controlName)}
                    >
                    </Input>
                    { idx === 0 ? <hr/> : null }
                </div>
            )
        });
        return inputs;
    }
    render() {
        const select = <Select
            label='Choose correct answer'
            value={this.state.rightAnswerId}
            onChange={this.selectChangeHandler}
            options={[
                { text: '1', value: 1},
                { text: '2', value: 2},
                { text: '3', value: 3},
                { text: '4', value: 4},
            ]}
        />;
        return (
            <div className={classes.QuizCreator}>
                <div>
                    <h1>Quiz Creator</h1>
                    <form onSubmit={this.submitHandler}>
                        { this.renderInputs() }
                        {select}
                        <Button
                            type='primary'
                            onClick={this.addQuestionHandler}
                            disabled={!this.state.isFormValid}
                        >
                            Add Question
                        </Button>
                        <Button
                            type='success'
                            onClick={this.CreateQuizHandler}
                            disabled={this.props.quiz.length  === 0}
                        >
                            Create Test
                        </Button>
                    </form>
                </div>
            </div>
        )
    }

}

function mapStateToProps(state) {
    return {
        quiz: state.createQuiz.quiz,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        createQuizQuestion: (item) => dispatch(createQuizQuestion(item)),
        finishCreateQuiz: () => dispatch(finishCreateQuiz())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuizCreatorComponent)
