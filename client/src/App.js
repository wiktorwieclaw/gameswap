import SignIn from './views/SignIn'
import SignUp from './views/SignUp'
import MainPage from './views/MainPage'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import {CssBaseline} from "@material-ui/core";

function App() {
  return (
      <Router>
          <CssBaseline/>
          <Switch>
              <Route path="/main" component={MainPage}/>
              <Route path="/login" component={SignIn}/>
              <Route path="/signup" component={SignUp}/>
          </Switch>
      </Router>
  );
}

export default App;