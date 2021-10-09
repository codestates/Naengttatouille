import React from 'react';
import  {useHistory} from 'react-router-dom';
import './Nav.css';
import axios from 'axios'

export default function Nav({login, accessToken}) {
  const history = useHistory();

  function loginHandler(){
    history.push('/login')
  }

  function logoutHandler(){
    axios.post('http://localhost:4000/signout',{headers:{authrozation : accessToken}})
    .then((res) => {
      if(res.stauts === 205){
        return history.push('/')
      }else if(res.status === 401){
        // return history.push('/') 만약 main이 가능하면 새로고침 안되면 about
      }else{
        // return alert('로그아웃에 실패하였습니다')임시
      }
    })
  }

  function changepPath(){
    history.push('/')
  }

  return(
    <div className='navigation' onClick={changepPath}>
      <i className='Logo' onClick={changepPath}>로고
        <span className='ServiceName'>냉따뚜이
        </span>
      </i>
      {/* {!islogin? <button className='loginBtn' onClick={loginHandler()}>로그인</button> : <button className='logoutBtn' onClick={logoutHandler()}>로그아웃</button>} */}
      <button className='loginBtn' onClick={loginHandler}>로그인 or 로그아웃</button>{/* 임시 */}
      {/* <form action='http://localhost:3000/login'>
        <input type='submit' value='로그인' />
      </form>   */}
    </div>
  ) 
}
