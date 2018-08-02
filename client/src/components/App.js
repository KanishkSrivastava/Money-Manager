import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

import LandingPage from '../containers/LandingPage';
import NavBar from '../containers/NavBar'
import Login from '../containers/Login';
import SignUp from '../containers/SignUp';
import Home from '../containers/Home';
import AllExpenses from '../containers/AllExpenses';
import Groups from '../containers/Groups'

const App =() => {
    return (
        <div>
        <Router>
            <div>
                <NavBar/>
                <Route exact path = "/" component = {LandingPage}/>
                <Route exact path ="/login" component = {Login}/>
                <Route exact path ="/signup" component = {SignUp}/>
                <Route exact path = "/home" component = {Home}/>
                <Route exact path = "/allExpenses" component = {AllExpenses}/>
                <Route exact path = "/groups" component = {Groups}/>
            </div>
        </Router>
        </div>
    )
}
export default App;