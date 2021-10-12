import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserInput from '../components/UserInput';
import { Link, useHistory } from 'react-router-dom';

export default function Login({ userInfo, userInfoHandler, loginHandler }) {
  useEffect(() => userInfoHandler('edit')(null, null, false), []);
  const history = useHistory();
  const checkErr = () => {
    // for (const key in userInfo) {
    if (!userInfo['email'][`validity`] && !userInfo['password'][`validity`]) return true;
    // }
    return false;
  };

  const handleLogin = () => {
    if (checkErr()) {
      console.log('failed to submit');
    } else {
      axios
        .post('http://localhost:4000/user/signin', {
          email: userInfo.email.data,
          password: userInfo.password.data,
        })
        .then((result) => {
          // console.log('response : ', result.config.data);
          loginHandler();
          history.push('/main');
        });
    }
  };
  return (
    <div>
      <h1>Sign In</h1>
      {/* <form id='signinForm' method='post' action='/user/signin'> */}
      <UserInput item='email' type='email' handler={userInfoHandler} inputInfo={userInfo} />
      <UserInput item='password' type='password' handler={userInfoHandler} inputInfo={userInfo} />
      {/* </form> */}
      <Link to='/signup'>
        <button type='button'>Sign Up</button>
      </Link>
      <button type={'button'} onClick={handleLogin}>
        {/* <button type={checkErr() ? 'button' : 'submit'} onClick={handleLogin}> */}
        Sign In
      </button>
    </div>
  );
}
