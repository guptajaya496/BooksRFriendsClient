
import React, {Component} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import Home from './components/home.jsx';
import Register from "./components/register.jsx";
import Login from "./components/login.jsx";
import Library from "./components/library.jsx";
import AboutUs from './components/aboutus.jsx';
import ContactUs from './components/contactus.jsx';
import User from './components/user.jsx';
import Logout from './components/logout.jsx';

class App extends Component{

   render(){
        return(
            <BrowserRouter history={history}>
                <Switch>
                    <Route exact path='/' component={Home} />
                    <Route  path='/aboutus' component={AboutUs} />
                    <Route  path='/library' component={Library} />
                    <Route  path='/contactus' component={ContactUs} />
                    <Route  path='/login' component={Login} />
                    <Route  path='/register' component={Register} />
                    <Route  path='/user' component={User} />
                    <Route  path='/logout' component={Logout} />
                </Switch>
            </BrowserRouter>
        );
   }
}

export default App;

