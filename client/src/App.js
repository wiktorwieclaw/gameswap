import SignIn from './views/SignIn'
import SignUp from './views/SignUp'
import MainPage from './views/MainPage'
import Intro from './views/Intro'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import {CssBaseline} from "@material-ui/core";
import Account from "./views/Account";

function App() {
  return (
      <Router>
          <CssBaseline/>
          <Switch>
              <Route path="/" component={Intro} exact/>
              <Route path="/main" component={MainPage}/>
              <Route path="/login" component={SignIn}/>
              <Route path="/signup" component={SignUp}/>
              <Route path="/intro" component={Intro}/>
              <Route path="/account" component={Account}/>
          </Switch>
      </Router>
  );
}

export default App;