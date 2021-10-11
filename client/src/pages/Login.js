import React, { useState } from 'react';
// import axios from 'axios';
import UserInput from '../components/UserInput';
import { Link } from 'react-router-dom';

export default function Login() {
  const [userInfo, setInputInfo] = useState({
    email: { data: '', validity: false },
    password: { data: '', validity: false },
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
      //     'https://localhost:4000/user/signin',
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
      <h1>Sign In</h1>
      <form id='signinForm' method='post' action='/user/signin'>
        <UserInput item='email' type='email' handler={handleInputValue} inputInfo={userInfo} />
        <UserInput item='password' type='password' handler={handleInputValue} inputInfo={userInfo} />
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
