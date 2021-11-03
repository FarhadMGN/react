import Layout from './hoc/layout/layout'
import Quiz from './containers/Quiz/Quiz'
import {Route, Switch, withRouter} from 'react-router-dom'
import QuizCreatorComponent from "./containers/quiz-creator/quiz-creator";
import AuthComponent from "./containers/auth/auth";
import QuizListComponent from "./containers/quiz-list/quiz-list";
import {connect} from "react-redux";
import React, {Component} from "react";
import {Redirect} from 'react-router-dom';
import Logout from './components/logout/logout'
import {autoLogin} from "./store/actions/auth.action";


class App extends Component{
    componentDidMount() {
        this.props.autoLogin();
    }

    render() {
        let routes = (
            <Switch>
                <Route path={'/auth'}  component={AuthComponent}/>
                <Route path={'/quiz/:id'}  component={Quiz}/>
                <Route path={'/'} exact component={QuizListComponent}/>
                <Redirect to={'/'}/>
            </Switch>
        );

        if (this.props.isAuthenticated) {
            routes = (
                <Switch>
                    <Route path={'/quiz-creator'}  component={QuizCreatorComponent}/>
                    <Route path={'/quiz/:id'}  component={Quiz}/>
                    <Route path={'/logout'}  component={Logout}/>
                    <Route path={'/'} exact component={QuizListComponent}/>
                    <Redirect to={'/'}/>
                </Switch>
            )
        }
        return (
            <Layout>
                { routes }
                {/*<NavLink to={'/'+link} activeClassName={classes.ActiveLink}>Link {link}</NavLink>*/}

            </Layout>
        );
    }
}

function mapStateToProps(state) {
    return {
        isAuthenticated: !!state.auth.token,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        autoLogin: () => dispatch(autoLogin()),
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
