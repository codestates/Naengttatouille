import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserInput from '../components/UserInput';
import { Link, useHistory } from 'react-router-dom';

export default function Mypage({ userInfo, userInfoHandler }) {
  // userInfoHandler('edit')(null, null, true);
  useEffect(() => userInfoHandler('edit')(null, null, true), []);
  const history = useHistory();
  const checkErr = () => {
    // for (const key in userInfo) {
    //   if (!userInfo[key][`validity`]) return true;
    // }
    // return false;
    // console.log(userInfo);
    const emailValidity = userInfo['email'][`validity`];
    const passValidity = userInfo['password'][`validity`];
    const confirmValidity = userInfo['password confirm'][`validity`];
    const nameValidity = userInfo['name'][`validity`];
    if (emailValidity && passValidity && confirmValidity && nameValidity) return false;
  };

  const handleLogin = () => {
    if (checkErr()) {
      console.log('failed to submit');
    } else {
      axios
        .patch(`http://localhost:4000/user/userinfo?${userInfo.email.data}`, {
          name: userInfo.name.data,
          password: userInfo.password.data,
        })
        .then((result) => {
          alert('회원정보 수정에 성공했습니다');
          // userInfoHandler('edit')(null, null, true);
          history.push('/');
        });
    }
  };

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
