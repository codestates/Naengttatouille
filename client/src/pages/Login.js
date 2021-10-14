import React, { useState } from 'react';
import axios from 'axios';
import { Link, useHistory } from 'react-router-dom';
import { checkErr, ShowInput } from '../functions/InputUserDataFunc';
import './Login.css';

axios.defaults.withCredentials = true;

export default function Login({ userInfo, userInfoHandler, loginHandler }) {
  const history = useHistory();
  //[input tag 앞의 텍스트, input type]의 배열
  const inputBoxList = [
    ['email', 'email'],
    ['password', 'password'],
  ];

  //각 인풋 박스의 유효성 검사 결과 불린값 배열
  const [currentErrList, setCurrentErrorList] = useState([]);
  //현재 유저가 input에 입력중인 텍스트 값
  const [inputInfo, setInputInfo] = useState({});

  const handleInputInfo = (key) => (value) => {
    if (key === 'init') setInputInfo({});
    else setInputInfo({ ...inputInfo, [key]: value });
  };

  const handleCurrentErrorList = (errList) => {
    setCurrentErrorList(errList);
  };

  const handleLogin = async () => {
    if (checkErr(currentErrList)) {
      console.log('failed to login submit');
    } else {
      try {
        await axios
          .post('http://localhost:4000/user/signin', {
            email: inputInfo.email,
            password: inputInfo.password,
          })
          .then((response) => {
            loginHandler();
            userInfoHandler(response.data);
            history.push('/main');
          })
          .catch((err) => {
            handleInputInfo('init');
            console.log('login faild Error : ', err);
            alert('로그인에 실패했습니다');
            return 'err';
          });
      } catch (err) {
        console.log('login try catch err : ', err, '---------------');
      }
    }
  };
  return (
    <div id='container-login' className='max'>
      <div className='f15 max-width'></div>
      <div id='content'>
        <div className='left-section-login login-img'></div>
        <div className='right-section-login'>
          <div className='h1-parent'>
            <h1>Sign In</h1>
          </div>
          <div className='userinputs-login'>
            <ShowInput
              inputBoxList={inputBoxList}
              userInfoHandler={userInfoHandler}
              userInfo={userInfo}
              inputInfo={inputInfo}
              handleInputInfo={handleInputInfo}
              handleCurrentErrorList={handleCurrentErrorList}
            />
          </div>
          <Link to='/signup'>
            <button
              className='button-signin button-signin-signup'
              type='button'
            >
              Sign Up
            </button>
          </Link>
          <button
            className='button-signin button-signin-signin'
            type={'button'}
            onClick={handleLogin}
          >
            Sign In
          </button>
        </div>
      </div>
      <div className='f30 max-width'></div>
    </div>
  );
}
