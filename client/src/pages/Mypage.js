import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserInput from '../components/UserInput';
import { Link, useHistory } from 'react-router-dom';

export default function Mypage({ userInfo, userInfoHandler }) {
  useEffect(() => userInfoHandler('edit')(null, null, true), []);
  const history = useHistory();
  const checkErr = () => {
    const emailValidity = userInfo['email'][`validity`];
    const passValidity = userInfo['password'][`validity`];
    const confirmValidity = userInfo['password confirm'][`validity`];
    const nameValidity = userInfo['name'][`validity`];
    if (emailValidity && passValidity && confirmValidity && nameValidity) return false;
  };

  const requestEdit = () => {
    if (checkErr()) {
      console.log('failed to mypage submit');
    } else {
      axios
        .patch(`http://localhost:4000/user/userinfo?${userInfo.email.data}`, {
          name: userInfo.name.data,
          password: userInfo.password.data,
        })
        .then((result) => {
          alert('회원정보 수정에 성공했습니다');
          history.push('/');
        })
        .catch((err) => {
          console.log('mypage faild Error : ', err);
          alert('회원정보 수정에 실패했습니다');
        });
    }
  };

  return (
    <div>
      <h1>Mypage</h1>
      <form>
        <UserInput item='email' type='email' handler={userInfoHandler} userInfo={userInfo} edit={true} />
        <UserInput item='password' type='password' handler={userInfoHandler} userInfo={userInfo} />
        <UserInput item='password confirm' type='password' handler={userInfoHandler} userInfo={userInfo} />
        <UserInput item='name' type='text' handler={userInfoHandler} userInfo={userInfo} />
      </form>
      <button type='button' onClick={requestEdit}>
        Edit Profile
      </button>
    </div>
  );
}
