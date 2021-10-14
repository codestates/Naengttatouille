import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { checkErr, ShowInput } from '../functions/InputUserDataFunc';

export default function Signup({ userInfo, userInfoHandler }) {
  const history = useHistory();
  //[input tag 앞의 텍스트, input type]의 배열
  const inputBoxList = [
    ['email', 'email'],
    ['password', 'password'],
    ['password confirm', 'password'],
    ['name', 'text'],
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

  const handleLogin = () => {
    if (checkErr(currentErrList)) {
      console.log('failed to sign up submit');
    } else {
      axios
        .post('http://localhost:4000/user/signup', {
          name: inputInfo.name,
          email: inputInfo.email,
          password: inputInfo.password,
        })
        .then((result) => {
          alert('회원가입을 성공했습니다');
          history.push('/login');
        })
        .catch((err) => {
          handleInputInfo('init');
          console.log('sign up faild Error : ', err);
          alert('회원가입을 실패했습니다');
        });
    }
  };
  return (
    <div>
      <h1>Sign Up</h1>
      <ShowInput
        inputBoxList={inputBoxList}
        userInfoHandler={userInfoHandler}
        userInfo={userInfo}
        inputInfo={inputInfo}
        handleInputInfo={handleInputInfo}
        handleCurrentErrorList={handleCurrentErrorList}
      />
      <button type='button' onClick={handleLogin}>
        Sign Up
      </button>
    </div>
  );
}
