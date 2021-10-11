import React, { useState } from 'react';
import axios from 'axios'
import './Ingredients.css'

export default function Ingredients({isAdmin}) {

  const [exContent, setExContent] = useState('')
  const [nameValue, setNameValue] = useState('')
  const [methodValue, setMethodValue] = useState('')

  const list = ['당근', '양상추', '토마토', '애호박', '양파', '가지', '아스파라거스', '감자', '고구마', '고추', '야채', '이름']
  let listDivision = []
    //'1','2','3','4','5','6','7','8','9','10'
    let realList 
    let explains

  const getIngredients = () => {
    // axios.get('http://localhost:4000/ingredient')
    // .then((res) => {
    //   realList.push(res.목록)
    // })
    // .catch(err => console.log(err))
  }
  getIngredients()


  function makeDivision(list) { //인자에 realList를 넣어줘야 함
    let copy = list.slice(0)
    while(copy.length > 0){
    if(copy.length >= 5){
      listDivision.push(copy.splice(0,5))
    }else if(copy.length < 5){
      listDivision.push(copy.splice(0))
    }
  }


  }
  makeDivision(list)

  const addIngredients = () => {
    axios.post('http://localhost:4000/ingredient', {ingredient_name : `${nameValue}`, keep_method: `${methodValue}`})
    setNameValue('')
    setMethodValue('')
  }

  const addRefrigerator = () => {
    axios.post('http://localhost:4000/refrigerator/ingredient') // 냉장고id와 식재료id를 알려줘야함

  }

  const onChangeName = (event) => {
    setNameValue(event.target.value)
  }

  const onChangeMethod = (event) => {
    setMethodValue(event.target.value)
  }


  function makeEl(el) {
    if(el[1] === undefined){
      return <div className='showIngredients'><span className='ingredient' onMouseOver={MouseOver} onMouseOut={MouseOut} onClick={addRefrigerator}>{el[0]}</span></div>
    }else if(el[2] === undefined){
      return <div className='showIngredients'><span className='ingredient' onMouseOver={MouseOver} onMouseOut={MouseOut} onClick={addRefrigerator}>{el[0]}</span><span className='ingredient' onMouseOver={MouseOver} onMouseOut={MouseOut} onClick={addRefrigerator}>{el[1]}</span></div>
    }else if(el[3] === undefined){
      return <div className='showIngredients'><span className='ingredient' onMouseOver={MouseOver} onMouseOut={MouseOut} onClick={addRefrigerator}>{el[0]}</span><span className='ingredient' onMouseOver={MouseOver} onMouseOut={MouseOut} onClick={addRefrigerator}>{el[1]}</span><span className='ingredient' onMouseOver={MouseOver} onMouseOut={MouseOut} onClick={addRefrigerator}>{el[2]}</span></div>
    }else if(el[4] === undefined){
      return <div className='showIngredients'><span className='ingredient' onMouseOver={MouseOver} onMouseOut={MouseOut} onClick={addRefrigerator}>{el[0]}</span><span className='ingredient' onMouseOver={MouseOver} onMouseOut={MouseOut} onClick={addRefrigerator}>{el[1]}</span><span className='ingredient' onMouseOver={MouseOver} onMouseOut={MouseOut} onClick={addRefrigerator}>{el[2]}</span><span className='ingredient' onMouseOver={MouseOver} onMouseOut={MouseOut} onClick={addRefrigerator}>{el[3]}</span></div>
    }else{
      return <div className='showIngredients'><span className='ingredient' onMouseOver={MouseOver} onMouseOut={MouseOut} onClick={addRefrigerator}>{el[0]}</span><span className='ingredient' onMouseOver={MouseOver} onMouseOut={MouseOut} onClick={addRefrigerator}>{el[1]}</span><span className='ingredient' onMouseOver={MouseOver} onMouseOut={MouseOut} onClick={addRefrigerator}>{el[2]}</span><span className='ingredient' onMouseOver={MouseOver} onMouseOut={MouseOut} onClick={addRefrigerator}>{el[3]}</span><span className='ingredient' onMouseOver={MouseOver} onMouseOut={MouseOut}>{el[4]}</span></div>
    }
  }

  //삭제하는 버튼

  const mekeDeleteBtn = () => {
    
  }

  
  
  function MouseOver(event) {
    event.target.style.background = 'red'
    // setExContent(explains.kind) 상태변경으로 설명 변경해주기
  }
  function MouseOut(event) {
    event.target.style.background = ''
  }

  return (
    <div className='ingredient__Contents'>
      <h3 className='ingredient__title'>식재료 리스트</h3>
      <section className='ingredients__List'>
          {listDivision.map((el) => {
            return <div className='grocery_row'>{makeEl(el)}</div>
          })}
      </section>
      <section className='Storage__method'>
        <h3 className='method__description'>식재료 보관방법</h3>

        {true ? <span><input onKeyUp={onChangeName} type='text' placeholder='재료이름을 입력해주세요'></input>
        <input onKeyUp={onChangeMethod} type='text' placeholder='보관법을 작성해주세요'>
          </input><button onClick={addIngredients}>추가</button></span> : null}
        
        <div className='method__explain'>{exContent}</div>
      </section>
    </div>
  )
}