import React, { useState, useEffect } from 'react';
// import axios from 'axios';
import UserInput from '../components/UserInput';
import { Link } from 'react-router-dom';

export default function Mypage({ userInfo, userInfoHandler }) {
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
      // axios.patch(
      //   `https://localhost:4000/userinfo:${userInfo.email.data}`,
      //   {
      //     name: userInfo.name.validity,
      //     email: userInfo.email.validity,
      //     password: userInfo.password.validity,
      //   },
      //   {
      //     withCredentials: true, //쿠키 허용
      //   }
      // );
      //   .then((result) => {
      //     console.log(result.config.data);
      //   });
    }
  };
  // console.log('mypage1 : ', userInfo.edit);
  // useEffect(() => {
  //   userInfoHandler('edit')(null, null, true);
  // }, []);
  // console.log('mypage2 : ', userInfo.edit);

  return (
    <div>
      <h1>Mypage</h1>
      <form id='signupForm' method='patch' action={`https://localhost:4000/userinfo:${userInfo.email.data}`}>
        <UserInput item='email' type='email' handler={userInfoHandler} inputInfo={userInfo} />
        <UserInput item='password' type='password' handler={userInfoHandler} inputInfo={userInfo} />
        <UserInput item='password confirm' type='password' handler={userInfoHandler} inputInfo={userInfo} />
        <UserInput item='name' type='text' handler={userInfoHandler} inputInfo={userInfo} />
      </form>
      <button type={checkErr() ? 'button' : 'submit'} onClick={handleLogin} form='signupForm'>
        Edit Profile
      </button>
    </div>
  );
}
