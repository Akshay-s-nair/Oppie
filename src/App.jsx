// import  { useState } from 'react';
import './App.css';
import Home from './component/Home';
import Signup from './component/Signup';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Signinandout from './Signinandout';
import Forgot from './Forgot';
import MessageBox from './component/MessageBox';

function App() {
  
  return (
    <>
      <Router>
       <Switch>
          <Route exact path='/'>
            <Home />
          </Route>
          <Route exact path='/Home'>
            <MessageBox />
          </Route>
          <Route exact path='/Oppie'>
            <Signinandout />
          </Route>
          <Route exact path='/Signin'>
            <Signinandout />
          </Route>
          <Route exact path='/Signup'>
            <Signup />
          </Route>
          <Route exact path='/login'>
            <Signinandout />
          </Route>
          <Route exact path='/signup'>
            <Signup />
          </Route>
          <Route exact path='/Oppie/ForgotPassword'>
            <Forgot />
          </Route>
        </Switch>
        
      </Router>
    </>
  );
}

export default App;
