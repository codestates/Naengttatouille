import React, { useState, useEffect } from 'react';
import './UserInput.css';

export default function UserInput({ item, type, handler, inputInfo }) {
  const errDivClassName = `${item}_err`;
  const [errMsg, setErrMsg] = useState('');
  const [isError, setIsError] = useState(false);
  // const passMinLength = 4;
  // const passMaxLength = 16;

  useEffect(() => {}, []);

  const validity = {
    valueMissing: { isValidity: true, message: `입력값이 필요합니다` },
    mailTypeMatch: { isValidity: true, message: `이메일 형식에 맞게 입력하세요` },
    passTypeMatch: {
      isValidity: true,
      message: `비밀번호에는 영어 소문자, 대문자, 숫자, 특수문자(!@#$%^&+=)가 있어야 합니다`,
    },
    passLength: { isValidity: true, message: `비밀번호는 4~16글자여야 합니다` },
    passMismatch: { isValidity: true, message: `비밀번호가 일치하지 않습니다` },
    nameLength: { isValidity: true, message: `이름은 2~8글자여야 합니다` },
  };

  const checkErr = () => {
    for (const key in validity) {
      if (!validity[key][`isValidity`]) return true;
    }
    return false;
  };

  const getMessage = () => {
    //입력값 오류에 따른 오류 메시지 반환
    for (const key in validity) {
      if (!validity[key][`isValidity`]) {
        return validity[key][`message`];
      }
    }
    return ``;
  };

  //입력 형식에 따른 유효성 검사
  const checkValidity = (inputType, str) => {
    if (str.length === 0) {
      validity[`valueMissing`][`isValidity`] = str.length !== 0;
      return str.length !== 0;
    }
    if (inputType === `email`) {
      const regExp = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;
      validity[`mailTypeMatch`][`isValidity`] = regExp.test(str);
      return regExp.test(str);
    } else if (inputType === `password`) {
      const regExp = /^.*(?=^.{4,16}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/;
      if (str.length >= 4) {
        validity[`passTypeMatch`][`isValidity`] = regExp.test(str);
        return regExp.test(str);
      } else {
        validity[`passLength`][`isValidity`] = str.length >= 4 && str.length <= 16;
        return str.length >= 4 && str.length <= 16;
      }
    } else if (inputType === `password confirm`) {
      const pw = inputInfo[`password`]['data'];
      validity[`passMismatch`][`isValidity`] = pw === str;
      return pw === str;
    } else if (inputType === `name`) {
      validity[`nameLength`][`isValidity`] = str.length >= 2;
      return str.length >= 2;
    } else return false;
  };

  const handleInputValue = (e) => {
    let value = e.target.value;
    let cv = checkValidity(item, e.target.value);
    setErrMsg(getMessage());
    setIsError(checkErr());
    // console.log(value);
    handler(item)(value, cv, null); //상위 컴포넌트에 입력값 전달
  };

  return (
    <div>
      <span>{item}</span>
      <input
        id={item}
        className={
          isError
            ? `isInvalid`
            : (inputInfo.edit === true || inputInfo.edit === undefined) && item === 'email'
            ? 'editEmail'
            : ``
        }
        type={type}
        onChange={handleInputValue}
        minLength={item === `password` || item === `password confirm` ? 4 : item === `name` ? 2 : 0}
        maxLength={item === `password` || item === `password confirm` ? 16 : item === `name` ? 8 : 99}
        placeholder={inputInfo.edit && item === 'email' ? `이메일` : ''}
        disabled={inputInfo.edit && item === 'email' ? true : false}
        required
      />
      <div id={`${errDivClassName} `} className={`errDiv ${isError ? `` : `hide`}`}>
        {errMsg}
      </div>
    </div>
  );
}

// const input = document.getElementsByClassName(item);
// const errDiv = document.getElementsByClassName(errDivClassName);

// function passMatch(p1, p2) {
//   if (p1 === p2) {
//     inputInfo[item]['validity'] = true;
//     input.nextSibling.classList.add('hide');
//     return true;
//   } else {
//     inputInfo[item]['validity'] = false;
//     input.nextSibling.classList.remove('hide');
//     return false;
//   }
// }

// const validityMessage = {
//   badInput: '잘못된 입력입니다.',
//   patternMismatch: '패턴에 맞게 입력하세요',
//   rangeOverflow: '범위를 초과하였습니다',
//   rangeUnderflow: '범위에 미달하였습니다',
//   stepMismatch: '간격에 맞게 입력하세요',
//   tooLong: '비밀번호는 16글자 이하여야 합니다',
//   tooShort: '비밀번호는 4~16자 입니다',
//   typeMismatch: `형식에 맞게 입력하세요`,
//   valueMissing: '이 필드를 반드시 입력하세요',
// };

// function getMessage(validity) {
//   //입력값 오류에 따른 오류 메시지 반환
//   for (const key in validityMessage) {
//     if (validity[key]) {
//       return validityMessage[key];
//     }
//   }
// }

// function showError(input) {
//   // input.setCustomValidity(getMessage(input.validity) || ''); //툴팁 메세지 변경
//   document.forms[0].classList.add('isInvalid'); // 검증 후 오류일 시 isInvalid 클래스명 추가(css용)
//   input.nextSibling.textContent = getMessage(input.validity); //에러 메시지 출력
// }

/*querySelectorAll('input').forEach((input) => {}) 의 형식은
  컴포넌트가 반복사용될 시에 input이 여러개 되므로 여러 엘리먼트가 선택된다.
  이것은 forEach로 해결될 거라고 생각했지만 전부 같은 메세지가 할당되는 로직 오류가 발생하여 채택하지 않았다. */

// if (input) {
//   input.addEventListener('invalid', (e) => {
//     e.preventDefault(); // 브라우져 툴팁 숨김

//     if (inputInfo.password.data !== inputInfo['password confirm']) {
//       console.log(
//         `비밀번호 불일치 ${inputInfo.password} !== ${inputInfo['password confirm']}`
//       );
//     }
//     showError(input);
//   });
// }
