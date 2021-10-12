import React, { useEffect } from 'react';
import axios from 'axios';
import UserInput from '../components/UserInput';
import { Link, useHistory } from 'react-router-dom';

export default function Login({ userInfo, userInfoHandler, loginHandler }) {
  useEffect(() => userInfoHandler('edit')(null, null, false), []);
  const history = useHistory();
  const checkErr = () => {
    if (!userInfo['email'][`validity`] && !userInfo['password'][`validity`]) return true;
    return false;
  };

  const handleLogin = () => {
    if (checkErr()) {
      console.log('failed to login submit');
    } else {
      axios
        .post('http://localhost:4000/user/signin', {
          email: userInfo.email.data,
          password: userInfo.password.data,
        })
        .then((response) => {
          loginHandler();
          userInfoHandler('admin')(null, null, response.data.admin);
          console.log('login success');
          history.push('/main');
        })
        .catch((err) => {
          userInfoHandler('init');
          console.log('login faild Error : ', err);
          alert('로그인에 실패했습니다');
        });
    }
  };
  return (
    <div>
      <h1>Sign In</h1>
      <UserInput item='email' type='email' handler={userInfoHandler} inputInfo={userInfo} />
      <UserInput item='password' type='password' handler={userInfoHandler} inputInfo={userInfo} />
      <Link to='/signup'>
        <button type='button'>Sign Up</button>
      </Link>
      <button type={'button'} onClick={handleLogin}>
        Sign In
      </button>
    </div>
  );
}
