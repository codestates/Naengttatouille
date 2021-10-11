import React from 'react';
import  { useHistory} from 'react-router-dom';
import './Nav.css';
import axios from 'axios'

export default function Nav({islogin, loginHandler, handleResponseSuccess}) {
  const history = useHistory();

  function goLogin(){
    history.push('/login')
  }

  function logoutHandler(){
    axios.post('http://localhost:4000/user/signout')
    .then((res) => {
      if(res.stauts === 205){
        loginHandler()
        history.push('/')
      }else{
        // return alert('로그아웃에 실패하였습니다')임시
      }
    })
  }
  const goSignup = () => {
    history.push('/signup')
  }

  const goMypage = () => {
    // handleResponseSuccess()
    history.push('/mypage')
  }

  const goMain = () => {
    // handleResponseSuccess()
    history.push('/main')
  }

  function changepPath(){
    history.push('/')
  }

  return(
    <div className='navigation' >
      
      <i className='Logo' onClick={changepPath}>로고
        <span className='ServiceName'>냉따뚜이
        </span>
        </i>
        <button className='goMain' onClick={goMain}>Main</button>
      
      <div className='btn'>
      {!islogin? <button className='goSignup' onClick={goSignup}>회원가입</button> : <button className='goMypage' onClick={goMypage}>MyPage</button>}
      {!islogin? <button className='loginBtn' onClick={goLogin}>로그인</button> : <button className='logoutBtn' onClick={logoutHandler}>로그아웃</button>}
      </div>
    </div>
  ) 
}
