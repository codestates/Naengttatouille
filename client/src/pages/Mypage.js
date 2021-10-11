import React, { useState } from 'react';
// import axios from 'axios';
import UserInput from '../components/UserInput';
import { Link } from 'react-router-dom';

export default function Mypage() {
  const [userInfo, setInputInfo] = useState({
    edit: true,
    email: { data: '', validity: false },
    password: { data: '', validity: false },
    'password confirm': { data: '', validity: false },
    name: { data: '', validity: false },
  });

  const handleInputValue = (key) => (e, v) => {
    setInputInfo({ ...userInfo, [key]: { data: e.target.value, validity: v } });
  };

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

  return (
    <div>
      <h1>Mypage</h1>
      <form id='signupForm' method='patch' action={`https://localhost:4000/userinfo:${userInfo.email.data}`}>
        <UserInput item='email' type='email' handler={handleInputValue} inputInfo={userInfo} />
        <UserInput item='password' type='password' handler={handleInputValue} inputInfo={userInfo} />
        <UserInput item='password confirm' type='password' handler={handleInputValue} inputInfo={userInfo} />
        <UserInput item='name' type='text' handler={handleInputValue} inputInfo={userInfo} />
      </form>
      <button type={checkErr() ? 'button' : 'submit'} onClick={handleLogin} form='signupForm'>
        Edit Profile
      </button>
    </div>
  );
}
