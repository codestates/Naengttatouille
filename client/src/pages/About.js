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
          <div className='about__intro'>당신의 냉장고 속 사정을
            우리에게 공유해주시겠어요?</div>
        <button className='about__signup__btn' onClick={signupHandler}>회원가입 하러가기!</button>
        </div>
      </div>
      
    </div>
  ) 
}
