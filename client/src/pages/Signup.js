import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserInput from '../components/UserInput';
import { useHistory } from 'react-router-dom';

export default function Signup({ userInfo, userInfoHandler }) {
  useEffect(() => userInfoHandler('edit')(null, null, false), []);
  const history = useHistory();
  const checkErr = () => {
    const emailValidity = userInfo['email'][`validity`];
    const passValidity = userInfo['password'][`validity`];
    const confirmValidity = userInfo['password confirm'][`validity`];
    const nameValidity = userInfo['name'][`validity`];
    if (emailValidity && passValidity && confirmValidity && nameValidity) return false;
  };

  const handleLogin = () => {
    if (checkErr()) {
      console.log('failed to sign up submit');
    } else {
      axios
        .post('http://localhost:4000/user/signup', {
          name: userInfo.name.data,
          email: userInfo.email.data,
          password: userInfo.password.data,
        })
        .then((result) => {
          alert('회원가입을 성공했습니다');
          history.push('/');
        })
        .catch((err) => {
          console.log('sign up faild Error : ', err);
          alert('회원가입을 실패했습니다');
        });
    }
  };
  return (
    <div>
      <h1>Sign Up</h1>
      <UserInput item='email' type='email' handler={userInfoHandler} inputInfo={userInfo} />
      <UserInput item='password' type='password' handler={userInfoHandler} inputInfo={userInfo} />
      <UserInput item='password confirm' type='password' handler={userInfoHandler} inputInfo={userInfo} />
      <UserInput item='name' type='text' handler={userInfoHandler} inputInfo={userInfo} />
      <button type='button' onClick={handleLogin}>
        Sign Up
      </button>
    </div>
  );
}
