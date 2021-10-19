import React, {Component} from 'react'
import classes from './quiz-creator.module.css'
import Button from "../../components/UI/button/button";
import {createControl} from "../../form/form-helper"
import Input from "../../components/UI/input/input";

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

export default class QuizCreatorComponent extends Component {

    state = {
        quiz: [],
        formControls: createFormControls()
    };

    submitHandler = event => {
        event.preventDefault();
    };
    addQuestionHandler = () => {

    };
    CreateQuizHandler = () => {

    };
    renderInputs() {
        const inputs = Object.keys(this.state.formControls).map((controlName, idx) => {
            const control = this.state.formControls[controlName];
            return (
                <Input
                    key={idx}
                    type={control.type}
                    value={control.value}
                    touched={control.touched}
                    label={control.label}
                    shouldValidate={!!control.validation}
                    errorMessage={control.errorMessage}
                    valid={control.valid}
                >
                </Input>
            )
        });
        return inputs;
    }
    render() {
        return (
            <div className={classes.QuizCreator}>
                <div>
                    <h1>Quiz Creator</h1>
                    <form onSubmit={this.submitHandler}>
                        { this.renderInputs() }
                        <select></select>
                        <Button
                            type='primary'
                            onClick={this.addQuestionHandler}
                        >
                            Add Question
                        </Button>
                        <Button
                            type='success'
                            onClick={this.CreateQuizHandler}
                        >
                            Create Test
                        </Button>
                    </form>
                </div>
            </div>
        )
    }

}

