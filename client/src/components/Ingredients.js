import React, { useState, useEffect } from 'react';
import axios from 'axios'
import './Ingredients.css'
import { v4 as uuidv4 } from 'uuid';

export default function Ingredients({
  isAdmin,
  isLogin,
  setGuestRefrigerator,
  guestRefrigerator}) {

  const [exContent, setExContent] = useState('')
  const [nameValue, setNameValue] = useState('')
  const [methodValue, setMethodValue] = useState('')

  const list = ['당근', '양상추', '토마토', '애호박', '양파', '가지', '아스파라거스', '감자', '고구마', '고추', '야채', '이름']
  let listDivision = []
    let realList = []

  const getIngredients = () => {
    axios.get('http://localhost:4000/ingredient')
    .then((res) => {
      res.data.map(el => realList.push(el.name))
    })
  }

  useEffect(()=>getIngredients(), [])

  makeDivision(list)
  console.log(realList)
  
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

  const addIngredients = () => {
    axios.post('http://localhost:4000/ingredient', {ingredient_name : `${nameValue}`, keep_method: `${methodValue}`})
    setNameValue('')
    setMethodValue('')
  }

  const addRefrigerator = (event) => {
    axios.post('http://localhost:4000/refrigerator/ingredient') // 냉장고id와 식재료id를 알려줘야함

  }

  const addGuestRefrigerator = (event) => {
    const text = event.target.textContent
    setGuestRefrigerator([...guestRefrigerator,text])
  }
  
  const onChangeName = (event) => {
    setNameValue(event.target.value)
  }

  const onChangeMethod = (event) => {
    setMethodValue(event.target.value)
  }

  const deleteIngrediente = (el) => {
    // axios.delete('http://localhost:4000' {ingredient_id: `${el.id}`})
    console.log(el)
  }


  function makeEl(el) {
    if(el[1] === undefined){
      return <div className='showIngredients'><span className='ingredient' onMouseOver={MouseOver} onMouseOut={MouseOut} onClick={isLogin ? addRefrigerator : addGuestRefrigerator}>{el[0]}</span></div>
    }else if(el[2] === undefined){
      return <div className='showIngredients'><span className='ingredient' onMouseOver={MouseOver} onMouseOut={MouseOut} onClick={isLogin ? addRefrigerator : addGuestRefrigerator}>{el[0]}</span><span className='ingredient' onMouseOver={MouseOver} onMouseOut={MouseOut} onClick={isLogin ? addRefrigerator : addGuestRefrigerator}>{el[1]}</span></div>
    }else if(el[3] === undefined){
      return <div className='showIngredients'><span className='ingredient' onMouseOver={MouseOver} onMouseOut={MouseOut} onClick={isLogin ? addRefrigerator : addGuestRefrigerator}>{el[0]}</span><span className='ingredient' onMouseOver={MouseOver} onMouseOut={MouseOut} onClick={isLogin ? addRefrigerator : addGuestRefrigerator}>{el[1]}</span><span className='ingredient' onMouseOver={MouseOver} onMouseOut={MouseOut} onClick={isLogin ? addRefrigerator : addGuestRefrigerator}>{el[2]}</span></div>
    }else if(el[4] === undefined){
      return <div className='showIngredients'><span className='ingredient' onMouseOver={MouseOver} onMouseOut={MouseOut} onClick={isLogin ? addRefrigerator : addGuestRefrigerator}>{el[0]}</span><span className='ingredient' onMouseOver={MouseOver} onMouseOut={MouseOut} onClick={isLogin ? addRefrigerator : addGuestRefrigerator}>{el[1]}</span><span className='ingredient' onMouseOver={MouseOver} onMouseOut={MouseOut} onClick={isLogin ? addRefrigerator : addGuestRefrigerator}>{el[2]}</span><span className='ingredient' onMouseOver={MouseOver} onMouseOut={MouseOut} onClick={isLogin ? addRefrigerator : addGuestRefrigerator}>{el[3]}</span></div>
    }else{
      return <div className='showIngredients'><span className='ingredient' onMouseOver={MouseOver} onMouseOut={MouseOut} onClick={isLogin ? addRefrigerator : addGuestRefrigerator}>{el[0]}</span><span className='ingredient' onMouseOver={MouseOver} onMouseOut={MouseOut} onClick={isLogin ? addRefrigerator : addGuestRefrigerator}>{el[1]}</span><span className='ingredient' onMouseOver={MouseOver} onMouseOut={MouseOut} onClick={isLogin ? addRefrigerator : addGuestRefrigerator}>{el[2]}</span><span className='ingredient' onMouseOver={MouseOver} onMouseOut={MouseOut} onClick={isLogin ? addRefrigerator : addGuestRefrigerator}>{el[3]}</span><span className='ingredient' onMouseOver={MouseOver} onMouseOut={MouseOut} onClick={isLogin ? addRefrigerator : addGuestRefrigerator}>{el[4]}</span></div>
    }
  }

  //재료 하나하나

  const makeDelete = (el) => {
    if(el[1] === undefined){
      return <div className='showDeleteBtn__Ingredients'><span className='deleteBtn__Ingredient' onClick={() => deleteIngrediente(el[0])}>X 이 식재료 지우기</span></div>
    }else if(el[2] === undefined){
      return <div className='showDeleteBtn__Ingredients'><span className='deleteBtn__Ingredient' onClick={() => deleteIngrediente(el[0])}>X 이 식재료 지우기</span><span className='deleteBtn__Ingredient' onClick={() => deleteIngrediente(el[1])}>X 이 식재료 지우기</span></div>
    }else if(el[3] === undefined){
      return <div className='showDeleteBtn__Ingredients'><span className='deleteBtn__Ingredient' onClick={() => deleteIngrediente(el[0])}>X 이 식재료 지우기</span><span className='deleteBtn__Ingredient' onClick={() => deleteIngrediente(el[1])}>X 이 식재료 지우기</span><span className='deleteBtn__Ingredient' onClick={() => deleteIngrediente(el[2])}>X 이 식재료 지우기</span></div>
    }else if(el[4] === undefined){
      return <div className='showDeleteBtn__Ingredients'><span className='deleteBtn__Ingredient' onClick={() => deleteIngrediente(el[0])}>X 이 식재료 지우기</span><span className='deleteBtn__Ingredient' onClick={() => deleteIngrediente(el[1])}>X 이 식재료 지우기</span><span className='deleteBtn__Ingredient' onClick={() => deleteIngrediente(el[2])}>X 이 식재료 지우기</span><span className='deleteBtn__Ingredient' onClick={() => deleteIngrediente(el[3])}>X 이 식재료 지우기</span></div>
    }else{
      return <div className='showDeleteBtn__Ingredients'><span className='deleteBtn__Ingredient' onClick={() => deleteIngrediente(el[0])}>X 이 식재료 지우기</span><span className='deleteBtn__Ingredient' onClick={() => deleteIngrediente(el[1])}>X 이 식재료 지우기</span><span className='deleteBtn__Ingredient' onClick={() => deleteIngrediente(el[2])}>X 이 식재료 지우기</span><span className='deleteBtn__Ingredient' onClick={() => deleteIngrediente(el[3])}>X 이 식재료 지우기</span><span className='deleteBtn__Ingredient' onClick={() => deleteIngrediente(el[4])}>X 이 식재료 지우기</span></div>
    }
  }

  //삭제하는 버튼
  
  function MouseOver(event) {
    event.target.style.background = 'red'
    // setExContent(explains.kind) 상태변경으로 설명 변경해주기
  }
  function MouseOut(event) {
    event.target.style.background = ''
  }

  return (
    <div className='ingredient__Container'>
      <div className='ingredient__title'>식재료 리스트</div>
      <section className='ingredients__List'>
          {listDivision.map((el) => {
            return <div key={uuidv4()} className='grocery_row'>
              {makeEl(el)}
              {isAdmin ? makeDelete(el) : null}
            </div>
          })}
          
      </section>
      <section className='Storage__method'>
        <span className='method__description'>식재료 보관방법</span>

        {isAdmin ? <span><input onKeyUp={onChangeName} type='text' placeholder='재료이름을 입력해주세요'></input>
        <input onKeyUp={onChangeMethod} type='text' placeholder='보관법을 작성해주세요'>
          </input><button onClick={addIngredients}>추가</button></span> : null}
        
        <div className='method__explain'>{exContent}</div>
      </section>
    </div>
  )
}