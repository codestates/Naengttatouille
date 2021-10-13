module.exports = class Validity {
  //유효성 검사 상태 객체
  //isValidity true : 오류 없음 false : 오류 있음
  constructor(inputInfo) {
    this.inputStart = { isValidity: false, message: '' };
    this.valueMissing = { isValidity: true, message: `입력값이 필요합니다` };
    this.mailTypeMatch = { isValidity: true, message: `이메일 형식에 맞게 입력하세요` };
    this.passTypeMatch = {
      isValidity: true,
      message: `비밀번호에는 영어 소문자, 대문자, 숫자, 특수문자(!@#$%^&+=)가 있어야 합니다`,
    };
    this.passLength = { isValidity: true, message: `비밀번호는 4~16글자여야 합니다` };
    this.passMismatch = { isValidity: true, message: `비밀번호가 일치하지 않습니다` };
    this.nameLength = { isValidity: true, message: `이름은 2~8글자여야 합니다` };
  }

  //모든 입력값 유효성 검사의 통과 여부 확인 (오류 있음 : true)
  checkErr() {
    for (const key in this) {
      if (!this[key][`isValidity`]) return true;
    }
    return false;
  }

  //입력값 오류에 따른 오류 메시지 반환
  getMessage() {
    for (const key in this) {
      if (!this[key][`isValidity`]) {
        return this[key][`message`];
      }
    }
    return ``;
  }

  //입력 형식에 따른 유효성 검사
  checkValidity(inputInfo, item, str) {
    this.inputStart.isValidity = true;
    if (str.length === 0) {
      this[`valueMissing`][`isValidity`] = str.length !== 0;
      return str.length !== 0;
    }
    if (item === `email`) {
      const regExp = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;
      this[`mailTypeMatch`][`isValidity`] = regExp.test(str);
      return regExp.test(str);
    } else if (item === `password`) {
      const regExp = /^.*(?=^.{4,16}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/;
      if (str.length >= 4) {
        this[`passTypeMatch`][`isValidity`] = regExp.test(str);
        return regExp.test(str);
      } else {
        this[`passLength`][`isValidity`] = str.length >= 4 && str.length <= 16;
        return str.length >= 4 && str.length <= 16;
      }
    } else if (item === `password confirm`) {
      const pw = inputInfo.password;
      this[`passMismatch`][`isValidity`] = pw === str;
      return pw === str;
    } else if (item === `name`) {
      this[`nameLength`][`isValidity`] = str.length >= 2;
      return str.length >= 2;
    } else return false;
  }

  show() {
    console.log('-------------------------');
    for (const key in this) {
      console.log(key, this[key]);
    }
    console.log('-------------------------');
  }
};
