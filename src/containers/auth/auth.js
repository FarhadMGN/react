import React from 'react'
import classes from './auth.module.css'
import Button from "../../components/UI/button/button";
import Input from "../../components/UI/input/input";
import {connect} from "react-redux";
import {auth} from "../../store/actions/auth.action";

class AuthComponent extends React.Component {

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

    loginHandler = () => {
        this.props.auth(
            this.state.formControls.email.value,
            this.state.formControls.password.value,
            true
        );
    };
    registrationHandler = () => {
        this.props.auth(
            this.state.formControls.email.value,
            this.state.formControls.password.value,
            false
        );
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

function mapDispatchToProps(dispatch) {
    return {
        auth: (email, password, isLogin) => dispatch(auth(email, password, isLogin)),
    }
}

export default connect(null, mapDispatchToProps)(AuthComponent)
