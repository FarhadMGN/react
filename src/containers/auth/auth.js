import React from 'react'
import classes from './auth.module.css'
import Button from "../../components/UI/button/button";
import Input from "../../components/UI/input/input";
import axios from "axios";
import API_KEY from "../../axios/secrets";

export default class AuthComponent extends React.Component {

    state = {
        isFormValid: null,
        formControls: {
            email: {
                value: '',
                type: 'email',
                label: 'Email',
                errorMessage: 'Type correct email',
                valid: false,
                touched: false,
                validation: {
                    required: true,
                    email: true
                }
            },
            password: {
                value: '',
                type: 'password',
                label: 'Password',
                errorMessage: 'Type correct password',
                valid: false,
                touched: false,
                validation: {
                    required: true,
                    minLength: 6
                }
            },
        }
    };

    loginHandler = async () => {
        try {
            const authData = {
                email: this.state.formControls.email.value,
                password: this.state.formControls.password.value,
                returnSecureToken: true
            };
            const resp = await axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`, authData);
        } catch (e) {
            console.log(e)
        }
    };
    registrationHandler = async () => {
        try {
            const authData = {
                email: this.state.formControls.email.value,
                password: this.state.formControls.password.value,
                returnSecureToken: true
            };
            const resp = await axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`, authData);
        } catch (e) {
            console.log(e)
        }
    };
    submitHandler = event => {
        event.preventDefault();
    };
    validateControl(value, validation) {
        if (!validation) {
            return true
        }
        let isValid = true;
        if (validation?.required) {
            isValid = value.trim() !== "" && isValid;
        }
        if (validation?.email) {
            const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            isValid = re.test(String(value).toLowerCase()) && isValid;
        }
        if (validation?.minLength) {
            isValid = value.length >= validation.minLength && isValid;
        }
        return isValid;
    }
    onChangeHandler = (event, controlName) => {
        // console.log(controlName, event.target.value);

        const formControls = { ...this.state.formControls };
        const control = { ...formControls[controlName]};

        control.value = event.target.value;
        control.touched = true;
        control.valid = this.validateControl(control.value, control.validation);

        let isFormValid = true;

        Object.keys(formControls)?.forEach((cont) => {
            isFormValid = formControls[cont].valid && isFormValid;
        });
        formControls[controlName] = control;

        this.setState({
            isFormValid,
            formControls
        });
        console.log(this.state.isFormValid, event.target.value);
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
                    onChange={event => this.onChangeHandler(event, controlName)}
                >
                </Input>
            )
        });
        return inputs;
    }
    render() {
        return (
            <div className={classes.Auth}>
                <div>
                    <h1>Authorization</h1>

                    <form className={classes.AuthForm} onSubmit={this.submitHandler}>

                        { this.renderInputs() }
                        <Button
                            disabled={!this.state.isFormValid}
                            onClick={this.loginHandler}
                            type="success">
                            Login
                        </Button>
                        <Button
                            disabled={!this.state.isFormValid}
                            onClick={this.registrationHandler}
                            type="primary">
                            Registration
                        </Button>
                    </form>
                </div>
            </div>
        )
    }

}
