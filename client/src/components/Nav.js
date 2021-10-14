import React from 'react';
import { useHistory } from 'react-router-dom';
import './Nav.css';

export default function Nav({ isLogin, 
  logoutHandler }) {
  const history = useHistory();

  function goLogin() {
    history.push('/login');
  }


  const goSignup = () => {
    history.push('/signup');
  };

  const goMypage = () => {
    history.push('/mypage');
  };

  const goMain = () => {
    history.push('/main');
  };

  function changepPath() {
    history.push('/');
  }

  return (
    <div className='navigation'>
        <span className='ServiceName' onClick={changepPath}>
Naengttatouille</span>
      <button className='goMain' onClick={goMain}>
        Main
      </button>

      <div className='btn'>
        {!isLogin ? (
          <button className='goSignup__goMypage' onClick={goSignup}>
            SingUp
          </button>
        ) : (
          <button className='goSignup__goMypage' onClick={goMypage}>
            MyPage
          </button>
        )}
        {!isLogin ? (
          <button className='loginBtn__logoutBtn' onClick={goLogin}>
            Signin
          </button>
        ) : (
          <button className='loginBtn__logoutBtn' onClick={logoutHandler}>
            Signout
          </button>
        )}
      </div>
    </div>
  );
}
