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

  //구글 로그인
  function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
  }

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
      <div class='g-signin2' data-onsuccess={onSignIn}></div>
    </div>
  );
}
