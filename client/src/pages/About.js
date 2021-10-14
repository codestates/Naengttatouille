import React from 'react';
import './About.css';
import  {useHistory} from 'react-router-dom';

export default function About({isLogin}) {
  const history = useHistory()

  function signupHandler() {
    history.push('/signup')
  }

  return(
    <div className='imgs'>
      <div className='img'>
        <div>
        <div className='about__intro__title'>냉따뚜이에 오신걸 환영합니다</div>
        <div className='about__intro'>안녕하세요 우리 서비스는 좋습니다.</div>
        <button className='about__signup__btn' onClick={signupHandler}>회원가입 하러가기!</button>
        </div>
      </div>
      
    </div>
  ) 
}
