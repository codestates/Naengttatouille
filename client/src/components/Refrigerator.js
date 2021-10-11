import React, { useState } from 'react';

import './Refrigerator.css'


export default function Refrigerator() {

  const list = ['당근', '양상추', '토마토', '애호박', '양파', '가지', '아스파라거스', '감자', '고구마', '고추', '야채', '이름']
  let listDivision =[]

  function makeDivision(list) {
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


  function makeEl(el) {
    if(el[1] === undefined){
      return <div className='showRefrigerator'><span className='ingredient'>{el[0]}</span></div>
    }else if(el[2] === undefined){
      return <div className='showRefrigerator'><span className='ingredient'>{el[0]}</span><span className='ingredient'>{el[1]}</span></div>
    }else if(el[3] === undefined){
      return <div className='showRefrigerator'><span className='ingredient'>{el[0]}</span><span className='ingredient'>{el[1]}</span><span className='ingredient'>{el[2]}</span></div>
    }else if(el[4] === undefined){
      return <div className='showRefrigerator'><span className='ingredient'>{el[0]}</span><span className='ingredient'>{el[1]}</span><span className='ingredient'>{el[2]}</span><span className='ingredient'>{el[3]}</span></div>
    }else{
      return <div className='showRefrigerator'><span className='ingredient'>{el[0]}</span><span className='ingredient'>{el[1]}</span><span className='ingredient'>{el[2]}</span><span className='ingredient'>{el[3]}</span><span className='ingredient'>{el[4]}</span></div>
    }
  }

  const makeDelete = (el) => {
    if(el[1] === undefined){
      return <div className='showDeleteBtn'><span className='deleteBtn' onClick={deleteIngrediente}>냉장고에서 지우기</span></div>
    }else if(el[2] === undefined){
      return <div className='showDeleteBtn'><span className='deleteBtn' onClick={deleteIngrediente}>냉장고에서 지우기</span><span className='deleteBtn' onClick={deleteIngrediente}>냉장고에서 지우기</span></div>
    }else if(el[3] === undefined){
      return <div className='showDeleteBtn'><span className='deleteBtn' onClick={deleteIngrediente}>냉장고에서 지우기</span><span className='deleteBtn' onClick={deleteIngrediente}>냉장고에서 지우기</span><span className='deleteBtn' onClick={deleteIngrediente}>냉장고에서 지우기</span></div>
    }else if(el[4] === undefined){
      return <div className='showDeleteBtn'><span className='deleteBtn' onClick={deleteIngrediente}>냉장고에서 지우기</span><span className='deleteBtn' onClick={deleteIngrediente}>냉장고에서 지우기</span><span className='deleteBtn' onClick={deleteIngrediente}>냉장고에서 지우기</span><span className='deleteBtn' onClick={deleteIngrediente}>냉장고에서 지우기</span></div>
    }else{
      return <div className='showDeleteBtn'><span className='deleteBtn' onClick={deleteIngrediente}>냉장고에서 지우기</span><span className='deleteBtn' onClick={deleteIngrediente}>냉장고에서 지우기</span><span className='deleteBtn' onClick={deleteIngrediente}>냉장고에서 지우기</span><span className='deleteBtn' onClick={deleteIngrediente}>냉장고에서 지우기</span><span className='deleteBtn' onClick={deleteIngrediente}>냉장고에서 지우기</span></div>
    }
  }
  

  const deleteIngrediente = () => {
    console.log('작동이 되고 있는거니?')
  }

  return (
    <div>
      <h3 className='Refrigerator__title'>나의 냉장고 속 재료</h3>
      <section className='My__refrigerator'>
        {listDivision.map((el) => {
            return <div className='grocery_row'>
              {makeEl(el)}
              {makeDelete(el)}
              </div>
          })}
      </section>
    </div>
  )
}
