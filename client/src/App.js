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
  const [isLogin, setIsLogin] = useState(false);
  const [userInfo, setUserInfo] = useState({
    user_id: '',
    email: { data: '', validity: false },
    password: { data: '', validity: false },
    'password confirm': { data: '', validity: false },
    name: { data: '', validity: false },
    admin: false,
    edit: false,
  });
  // console.log(userInfo);

  const userInfoHandler = (key) => (value, validity, boolean) => {
    // console.log('key : ', key);
    // console.log('value : ', value);
    // console.log('validity : ', validity);
    // console.log('boolean : ', boolean);
    if (key === 'edit' || key === 'admin') {
      setUserInfo({ ...userInfo, [key]: boolean });
    }
    if (key === 'user_id') {
      setUserInfo({ ...userInfo, [key]: value });
    }
    if (key === 'email' || key === 'password' || key === 'password confirm' || key === 'name')
      setUserInfo({ ...userInfo, [key]: { data: value, validity: validity } });
    if (key === 'init')
      setUserInfo({
        user_id: { data: '', validity: false },
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

  const isAuthenticated = () => {};
  const handleResponseSuccess = () => {
    axios.get('https://localhost:4000/auth').then((res) => {
      isAuthenticated();
      return res;
    });
  };
  // const handleLogout = () => {
  //   axios.post('https://localhost:4000/signout').then((res) => {
  //     setUserinfo(null);
  //     setIsLogin(false);
  //     history.push('/');
  //   });
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
