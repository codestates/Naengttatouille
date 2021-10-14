import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { checkErr, ShowInput } from '../functions/InputUserDataFunc';

export default function Mypage({ isLogin, userInfo, userInfoHandler }) {
  const history = useHistory();

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

  const requestEdit = () => {
    if (checkErr(currentErrList)) {
      console.log('failed to mypage submit');
    } else {
      console.log('**************', userInfo);
      console.log('**************', inputInfo);
      try {
        axios
          .patch(`http://localhost:4000/user/userinfo/${userInfo.user_id}`, {
            name: inputInfo.name,
            password: inputInfo.password,
          })
          .then((result) => {
            alert('회원정보 수정에 성공했습니다');
          })
          .catch((err) => {
            console.log('mypage faild Error : ', err);
            alert('회원정보 수정에 실패했습니다');
          });
      } catch (err) {
        console.log('회원정보 수정 요청에 실패', err);
      }
    }
  };

  useEffect(() => {
    if (!isLogin) history.push('/');
  }, []);

  return (
    <div>
      <h1>Mypage</h1>
      <ShowInput
        edit={true}
        inputBoxList={inputBoxList}
        userInfoHandler={userInfoHandler}
        userInfo={userInfo}
        inputInfo={inputInfo}
        handleInputInfo={handleInputInfo}
        handleCurrentErrorList={handleCurrentErrorList}
      />
      <button type='button' onClick={requestEdit}>
        Edit Profile
      </button>
    </div>
  );
}
