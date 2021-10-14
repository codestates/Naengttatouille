import React, { useState, useEffect } from 'react';
import './UserInput.css';
const Validity = require('../functions/validationFunctions');

export default function UserInput({
  item,
  type,
  userInfoHandler,
  userInfo,
  edit,
  handleInputInfo,
  handleErrState,
}) {
  const validity = new Validity(userInfo);
  const errDivClassName = `${item}_err`;
  const [errMsg, setErrMsg] = useState('');
  const [isError, setIsError] = useState(false);

  const handleInputValue = (e) => {
    let value = e.target.value;
    validity.checkValidity(userInfo, item, value);
    setErrMsg(validity.getMessage());
    setIsError(validity.checkErr());
    handleErrState(item, validity.checkErr());
    // validity.show(); //오류 상태 확인
    handleInputInfo(item)(value);
    userInfoHandler({ [item]: value }); //상위 컴포넌트에 입력값 전달
  };
  return (
    <div id='userinput-container' className='f10'>
      <div className='input-group'>
        <span className='input-name'>{item}</span>
        <input
          id={item}
          className={isError ? `isInvalid input ` : `input`}
          type={type}
          onChange={handleInputValue}
          minLength={
            item === `password` || item === `password confirm`
              ? 4
              : item === `name`
              ? 2
              : 0
          }
          maxLength={
            item === `password` || item === `password confirm`
              ? 16
              : item === `name`
              ? 8
              : 99
          }
          placeholder={edit ? userInfo.email : false}
          disabled={edit ? true : false}
          required
        />
      </div>
      <div
        id={`${errDivClassName} `}
        className={`errDiv ${isError ? `` : `hide`}`}
      >
        {errMsg}
      </div>
    </div>
  );
}
