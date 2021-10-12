import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserInput from '../components/UserInput';
import { Link, useHistory } from 'react-router-dom';

export default function Signup({ userInfo, userInfoHandler }) {
  useEffect(() => userInfoHandler('edit')(null, null, false), []);
  const [success, setSuccess] = useState(false);
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
          console.log(err);
          alert('회원가입을 실패했습니다');
        });
    }
  };
  // useEffect(() => <Link to='/login' />, [success]);
  return (
    <div>
      <h1>Sign Up</h1>

      {/* <form id='signupForm' method='post' action='http://localhost:4000/user/signup'> */}
      <UserInput item='email' type='email' handler={userInfoHandler} inputInfo={userInfo} />
      <UserInput item='password' type='password' handler={userInfoHandler} inputInfo={userInfo} />
      <UserInput item='password confirm' type='password' handler={userInfoHandler} inputInfo={userInfo} />
      <UserInput item='name' type='text' handler={userInfoHandler} inputInfo={userInfo} />
      {/* </form> */}
      {/* {success ? <Link to='/login' /> : null} */}
      <button type='button' onClick={handleLogin}>
        {/* <button type={checkErr() ? 'button' : 'submit'} onClick={handleLogin} form='signupForm'> */}
        Sign Up
      </button>
    </div>
  );
}
