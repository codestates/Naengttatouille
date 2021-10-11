import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserInput from '../components/UserInput';

export default function Signup({ userInfo, userInfoHandler }) {
  const checkErr = () => {
    for (const key in userInfo) {
      if (!userInfo[key][`validity`]) return true;
    }
    return false;
  };

  const handleLogin = () => {
    if (checkErr()) {
      console.log('failed to submit');
    } else {
      // axios
      //   .post(
      //     'https://localhost:4000/user/signup',
      //     {
      //       name: userInfo.name.validity,
      //       email: userInfo.email.validity,
      //       password: userInfo.password.validity,
      //     },
      //     {
      //       withCredentials: true, //쿠키 허용
      //     }
      //   )
      //   .then((result) => {
      //     console.log(result.config.data);
      //   });
    }
  };
  console.log('signup1 : ', userInfo.edit);
  useEffect(() => {
    userInfoHandler('edit')(null, null, false);
    return userInfoHandler('edit')(null, null, false);
  }, []);
  console.log('signup2 : ', userInfo.edit);

  return (
    <div>
      <h1>Sign Up</h1>
      <form id='signupForm' method='post' action='https://localhost:4000/user/signup'>
        <UserInput item='email' type='email' handler={userInfoHandler} inputInfo={userInfo} />
        <UserInput item='password' type='password' handler={userInfoHandler} inputInfo={userInfo} />
        <UserInput item='password confirm' type='password' handler={userInfoHandler} inputInfo={userInfo} />
        <UserInput item='name' type='text' handler={userInfoHandler} inputInfo={userInfo} />
      </form>
      <button type={checkErr() ? 'button' : 'submit'} onClick={handleLogin} form='signupForm'>
        Sign Up
      </button>
    </div>
  );
}
