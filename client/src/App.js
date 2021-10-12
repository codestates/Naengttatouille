import React, { useEffect, useState } from 'react';
import { Switch, Route, Redirect, BrowserRouter } from 'react-router-dom';
import About from './pages/About';
import Login from './pages/Login';
import Main from './pages/Main';
import Mypage from './pages/Mypage';
import Signup from './pages/Signup';
import Loading from './components/Loading';
import Ingredients from './components/Ingredients';
import Refrigerator from './components/Refrigerator';
import Nav from './components/Nav';
import axios from 'axios';
import './App.css';

function App() {
  const [isLogin, setIsLogin] = useState(false);

  const [userInfo, setUserInfo] = useState({
    email: { data: '', validity: true },
    password: { data: '', validity: false },
    'password confirm': { data: '', validity: false },
    name: { data: '', validity: false },
    admin: false,
    edit: false,
  });

  const userInfoHandler = (key) => (value, validity, boolean) => {
    console.log('key : ', key);
    if (key === 'edit' || key === 'admin') setUserInfo({ ...userInfo, [key]: boolean });
    if (key === 'email' || key === 'password' || key === 'password confirm' || key === 'name')
      setUserInfo({ ...userInfo, [key]: { data: value, validity: validity } });
  };

  const loginHandler = () => {
    setIsLogin(!isLogin);
  };

  const handleResponseSuccess = () => {
    // 엑세스 토큰확인 요청보내는 함수
  };

  return (
    <BrowserRouter>
      <div className='App'>
        <Switch>
          <Route exact path='/'>
            <Nav isLogin={isLogin} loginHandler={loginHandler} handleResponseSuccess={handleResponseSuccess} />
            <About isLogin={isLogin} />
          </Route>
          <Route path='/login'>
            <Login userInfo={userInfo} loginHandler={loginHandler} userInfoHandler={userInfoHandler} />
          </Route>
          <Route path='/main'>
            <Nav />
            <Main isLogin={isLogin} />
          </Route>
          <Route path='/mypage'>
            <Nav />
            <Mypage userInfo={userInfo} userInfoHandler={userInfoHandler} />
          </Route>
          <Route path='/signup'>
            <Signup userInfo={userInfo} userInfoHandler={userInfoHandler} />
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
