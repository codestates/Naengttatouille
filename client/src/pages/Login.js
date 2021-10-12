import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserInput from '../components/UserInput';
import { Link } from 'react-router-dom';

export default function Login({ userInfo, userInfoHandler }) {
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
      // console.log(`
      //       name: ${userInfo.name.data},
      //       email: ${userInfo.email.data},
      //       password: ${userInfo.password.data},
      // `);
      axios
        .post(
          'http://localhost:4000/user/signin',
          {
            email: userInfo.email.data,
            password: userInfo.password.data,
          },
          {
            withCredentials: true, //쿠키 허용
          }
        )
        .then((result) => {
          console.log(result.config.data);
        });
    }
  };
  // console.log('login1 : ', userInfo.edit);
  // useEffect(() => {
  //   userInfoHandler('edit')(null, null, false);
  //   return userInfoHandler('edit')(null, null, false);
  // }, []);
  // console.log('login2 : ', userInfo.edit);
  return (
    <div>
      <h1>Sign In</h1>
      <form id='signinForm' method='post' action='/user/signin'>
        <UserInput item='email' type='email' handler={userInfoHandler} inputInfo={userInfo} />
        <UserInput item='password' type='password' handler={userInfoHandler} inputInfo={userInfo} />
      </form>
      <Link to='/signup'>
        <button type='button'>Sign Up</button>
      </Link>
      <button type={checkErr() ? 'button' : 'submit'} onClick={handleLogin}>
        Sign In
      </button>
    </div>
  );
}
