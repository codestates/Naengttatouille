import UserInput from '../components/UserInput';
import React, { useState, useEffect } from 'react';

function checkErr(inputErrorList) {
  for (let err of inputErrorList) {
    if (err) return true;
  }
  return false;
}

function ShowInput({ edit, inputBoxList, userInfoHandler, userInfo, handleInputInfo, handleCurrentErrorList }) {
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

  return inputBoxList.map((inputBox) => (
    <UserInput
      edit={edit}
      item={inputBox[0]}
      type={inputBox[1]}
      userInfoHandler={userInfoHandler}
      userInfo={userInfo}
      handleInputInfo={handleInputInfo}
      handleErrState={handleErrState}
    />
  ));
}

export { checkErr, ShowInput };
