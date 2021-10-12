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
    email: { data: '', validity: false },
    password: { data: '', validity: false },
    'password confirm': { data: '', validity: false },
    name: { data: '', validity: false },
    admin: false,
    edit: false,
  });

  const userInfoHandler = (key) => (value, validity, boolean) => {
    // console.log('key : ', key);
    if (key === 'edit' || key === 'admin') {
      setUserInfo({ ...userInfo, [key]: boolean });
      // console.log(`${key} changed to : ${userInfo[key]}`);
    }
    if (key === 'email' || key === 'password' || key === 'password confirm' || key === 'name')
      setUserInfo({ ...userInfo, [key]: { data: value, validity: validity } });
    if (key === 'init')
      setUserInfo({
        email: { data: '', validity: false },
        password: { data: '', validity: false },
        'password confirm': { data: '', validity: false },
        name: { data: '', validity: false },
        admin: false,
        edit: false,
      });
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
        <Nav
          isLogin={isLogin}
          userInfo={userInfo}
          loginHandler={loginHandler}
          userInfoHandler={userInfoHandler}
          handleResponseSuccess={handleResponseSuccess}
        />

        <Switch>
          <Route exact path='/'>
            <About isLogin={isLogin} userInfo={userInfo} />
          </Route>
          <Route path='/login'>
            <Login
              isLogin={isLogin}
              userInfo={userInfo}
              loginHandler={loginHandler}
              userInfoHandler={userInfoHandler}
            />
          </Route>
          <Route path='/main'>
            <Main isLogin={isLogin} userInfo={userInfo} />
          </Route>
          <Route path='/mypage'>
            <Mypage isLogin={isLogin} userInfo={userInfo} userInfoHandler={userInfoHandler} />
          </Route>
          <Route path='/signup'>
            <Signup isLogin={isLogin} userInfo={userInfo} userInfoHandler={userInfoHandler} />
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
