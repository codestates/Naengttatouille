import UserInput from '../components/UserInput';
import React, { useState, useEffect } from 'react';

function checkErr(inputErrorList) {
  for (let err of inputErrorList) {
    if (err) return true;
  }
  return false;
}

//edit: mypage인지 여부(회원정보 수정 시 input 태그 disable 값 주기 위함)
//inputBoxList: 각 user페이지 처음에 있는 2차배열 [input tag 앞에 붙일 텍스트, input type]
//  //userInfoHandler: App.js 의 userInfo에 값을 전달하는 함수
//userInfo: App.js에서 내려오는 객체 변수. 현재 로그인 한 유저의 정보
//inputInfo: 각 유저 페이지 상태 변수. 현재 페에지의 input 박스들 값 모음 객체
//handleInputInfo(key)(value): user 페이지의 input 태그들 전체 값들이 저장되는 객체
//                             key: input태그 앞 텍스트, value:input태그 값
//handleCurrentErrorList: user페이지 각 인풋 박스의 유효성 검사 결과 불린값 배열(오류 있음:true)
function ShowInput({
  edit,
  inputBoxList,
  userInfoHandler,
  userInfo,
  inputInfo,
  handleInputInfo,
  handleCurrentErrorList,
}) {
  const [errState, setErrState] = useState({});

  const handleErrState = (item, err) => {
    setErrState({ ...errState, [item]: err });
  };

  const errSetting = () => {
    const errList = [];
    for (let item in errState) {
      errList.push(errState[item]);
    }
    handleCurrentErrorList(errList);
  };

  useEffect(() => {
    errSetting();
  }, [errState]);

  return inputBoxList.map((inputBox, idx) => (
    <UserInput
      key={idx}
      edit={edit}
      item={inputBox[0]}
      type={inputBox[1]}
      userInfoHandler={userInfoHandler}
      userInfo={userInfo}
      inputInfo={inputInfo}
      handleInputInfo={handleInputInfo}
      handleErrState={handleErrState}
    />
  ));
}

export { checkErr, ShowInput };
