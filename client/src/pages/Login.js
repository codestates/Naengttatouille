import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useHistory } from 'react-router-dom';
import { checkErr, ShowInput } from '../functions/InputUserDataFunc';

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
    }
  };
  return (
    <div>
      <h1>Sign In</h1>
      <ShowInput
        inputBoxList={inputBoxList}
        userInfoHandler={userInfoHandler}
        userInfo={userInfo}
        inputInfo={inputInfo}
        handleInputInfo={handleInputInfo}
        handleCurrentErrorList={handleCurrentErrorList}
      />
      <Link to='/signup'>
        <button type='button'>Sign Up</button>
      </Link>
      <button type={'button'} onClick={handleLogin}>
        Sign In
      </button>
    </div>
  );
}
