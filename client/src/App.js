import React, { useState, useEffect } from 'react';
import { Switch, Route, BrowserRouter, useHistory } from 'react-router-dom';
import About from './pages/About';
import Login from './pages/Login';
import Main from './pages/Main';
import Mypage from './pages/Mypage';
import Signup from './pages/Signup';
import Nav from './components/Nav';
import './App.css';
import axios from 'axios';

function App() {
  const history = useHistory();
  const initUser = {
    user_id: '',
    email: '',
    password: '',
    'password confirm': '',
    name: '',
    admin: false,
  };
  const [isLogin, setIsLogin] = useState(false);
  const [userInfo, setUserInfo] = useState(initUser);

  const userInfoHandler = (data) => {
    setUserInfo(data);
  };

  const loginHandler = () => {
    setIsLogin(true);
    console.log('로그인');
  };

  const logoutHandler = () => {
    axios.post('https://localhost:4000/user/signout').then((res) => {
      setIsLogin(false);
      alert(`${userInfo}님 이용해주셔서 감사합니다`);
      userInfoHandler(initUser);
      history.push('/');
      console.log('로그아웃');
    });
  };

  const isAuthenticated = async () => {
    await axios
      .get('http://localhost:4000/user/auth')
      .then((response) => {
        loginHandler();
        userInfoHandler(response.data);
        console.log('🚀 ~ file: App.js ~ line 49 ~ .then ~ response.data', response.data);
        console.log('토큰 유지 중');
        return response.data;
      })
      .catch((error) => {
        logoutHandler();
        console.log('토큰 만료, 로그아웃');
      });
  };

  // const handleResponseSuccess = () => {
  //   isAuthenticated();
  // };

  useEffect(() => {
    isAuthenticated();
  }, []);

  return (
    <BrowserRouter>
      <div className='App'>
        <Nav
          isLogin={isLogin}
          userInfo={userInfo}
          logoutHandler={logoutHandler}
          userInfoHandler={userInfoHandler}
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
            ></Login>
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
