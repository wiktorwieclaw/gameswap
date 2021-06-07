import SignIn from './views/SignIn'
import SignUp from './views/SignUp'
import MainPage from './views/MainPage'
import Intro from './views/Intro'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import {CssBaseline} from "@material-ui/core";
import Account from "./views/Account";
import AddGame from "./views/AddGame";
import {useEffect, useState} from "react";
import Authorization from './auth'
import {Redirect} from "react-router";
import Header from "./components/Header";
import Page404 from "./views/Page404"

export default function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(Authorization.isLoggedIn());

    useEffect(() => {
        setIsLoggedIn(Authorization.isLoggedIn());
    });

    return (
        <Router>
            <CssBaseline/>
            <Header setIsLoggedIn={setIsLoggedIn}/>
            <Switch>
                <Route path="/" render={() => !isLoggedIn ? <Intro/> : <MainPage/>} exact/>
                <Route path="/login"
                       render={() => !isLoggedIn ? <SignIn setIsLoggedIn={setIsLoggedIn}/> : <Redirect to='/'/>}/>
                <Route path="/signup" render={() => !isLoggedIn ? <SignUp/> : <Redirect to='/'/>}/>
                <Route path="/intro" render={() => !isLoggedIn ? <Intro/> : <Redirect to='/'/>}/>
                <Route path="/main" render={() => isLoggedIn ? <MainPage/> : <Redirect to='/'/>}/>
                <Route path="/account/:id" render={props => isLoggedIn ? <Account {...props}/> : <Redirect to='/'/>}/>
                <Route path="/add-game/:id" render={props => isLoggedIn ? <AddGame {...props}/> : <Redirect to='/'/>}/>
                <Route path='/404' render={() => <Page404/>}/>
                <Redirect to='/404'/>
            </Switch>
        </Router>
    );
}