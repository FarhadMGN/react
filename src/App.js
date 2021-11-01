import Layout from './hoc/layout/layout'
import Quiz from './containers/Quiz/Quiz'
import {Route, Switch} from 'react-router-dom'
import QuizCreatorComponent from "./containers/quiz-creator/quiz-creator";
import AuthComponent from "./containers/auth/auth";
import QuizListComponent from "./containers/quiz-list/quiz-list";


function App() {
  return (
      <Layout>
        {/*<Quiz />*/}
          {/*<NavLink to={'/'+link} activeClassName={classes.ActiveLink}>Link {link}</NavLink>*/}
          <Switch>
              <Route path={'/auth'} exact component={AuthComponent}/>
              <Route path={'/quiz-creator'} exact component={QuizCreatorComponent}/>
              <Route path={'/quiz/:id'} exact component={Quiz}/>
              <Route path={'/'} exact component={QuizListComponent}/>
              <div>nihao12</div>
              <p>oleg</p>
          </Switch>
      </Layout>
  );
}

export default App;
