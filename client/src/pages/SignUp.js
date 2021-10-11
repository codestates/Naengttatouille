import React, { useState } from 'react';
import axios from 'axios';
import UserInput from '../components/UserInput';

export default function Signup() {
  const [userInfo, setInputInfo] = useState({
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

  return (
    <div>
      <h1>Sign Up</h1>
      <form id='signupForm' method='post' action='https://localhost:4000/user/signup'>
        <UserInput item='email' type='email' handler={handleInputValue} inputInfo={userInfo} />
        <UserInput item='password' type='password' handler={handleInputValue} inputInfo={userInfo} />
        <UserInput item='password confirm' type='password' handler={handleInputValue} inputInfo={userInfo} />
        <UserInput item='name' type='text' handler={handleInputValue} inputInfo={userInfo} />
      </form>
      <button type={checkErr() ? 'button' : 'submit'} onClick={handleLogin} form='signupForm'>
        Sign Up
      </button>
    </div>
  );
}
