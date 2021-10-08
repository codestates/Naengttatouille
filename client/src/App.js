import React, { useEffect, useState } from 'react';
import { Switch, Route, Redirect, BrowserRouter } from 'react-router-dom';
import About from './pages/About';
import Login from './pages/Login';
import Main from './pages/Main';
import Mypage from './pages/Mypage';
import Signup from './pages/Signup';
import Loading from './components/Loading';
import Nav from './components/Nav';
import axios from 'axios';
import './App.css';

function App() {
  const [isLogin, setIsLogin] = useState(false);

  return (
    <BrowserRouter>
      <div className='App'>
        <Switch>
          <Route exact path='/'>
            <Nav />
            <About />
          </Route>
          <Route exact path='/login'>
            <Login />
          </Route>
          <Route exact path='/main'>
            <Nav />
            <Main />
          </Route>
          <Route exact path='/mypage'>
            <Nav />
            <Mypage />
          </Route>
          <Route exact path='/signup'>
            <Signup />
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
