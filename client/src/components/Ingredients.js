import React, { useState, useEffect } from 'react';
import axios from 'axios'
import './Ingredients.css'
import { v4 as uuidv4 } from 'uuid';


export default function Ingredients({
  isLogin,
  setGuestRefrigerator,
  guestRefrigerator,
  userInfo,
  setState,
  state}) {

  const [exContent, setExContent] = useState('')
  const [nameValue, setNameValue] = useState('')
  const [methodValue, setMethodValue] = useState('')
  const [division, setDivision] = useState([])
  const [divisionForGuest, setDivisionForGuest] = useState([])
  const [ingredientData, setIngredientData] = useState('')

  let guestDivision = []
  let listDivision = []
  const makeDivision = (realList) => { 
    const copy = realList.slice(0)
    while(copy.length > 0){
    if(copy.length >= 5){
        listDivision.push(copy.splice(0,5))
      }else if(copy.length < 5){
        listDivision.push(copy.splice(0))
      }
    }
  }


  useEffect(async()=> {
    
    let realList1 = await axios.get('http://localhost:4000/ingredient')
    .then(res => {
      return res.data
    })
    let realList = await realList1.map(el => el.name)
    setIngredientData(realList1)
    makeDivision(realList)
    setDivision(listDivision)
    
  },[])

  const addIngredients = () => {
    axios.post('http://localhost:4000/ingredient', {name : `${nameValue}`, keep_method: `${methodValue}`})
    // console.log(nameValue)
    // console.log(methodValue)
    setNameValue('')
    setMethodValue('')
    window.location.reload()
  }

  const addRefrigerator = async(event) => {
    let text = event.target.textContent
    let filtered = ingredientData.filter((el) => el.name === text)
    axios.post(`http://localhost:4000/refrigerator/${filtered[0].ingredient_id}`) 
    // setState(!state)
    window.location.reload()
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
  const deleteIngrediente = async(el) => {
    let filtered = ingredientData.filter((data) => data.name === el)
    axios.delete(`http://localhost:4000/ingredient/${filtered[0].ingredient_id}`)
    .then(res => console.log(res))
    
    let arr = await axios.get('http://localhost:4000/ingredient')
    .then((res) => res.data)
    console.log(arr)
    window.location.reload();
    
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
      return <div className='showDeleteBtn__Ingredients'><span className='deleteBtn__Ingredient' onClick={() => deleteIngrediente(el[0])}>X 삭제</span></div>
    }else if(el[2] === undefined){
      return <div className='showDeleteBtn__Ingredients'><span className='deleteBtn__Ingredient' onClick={() => deleteIngrediente(el[0])}>X 삭제</span><span className='deleteBtn__Ingredient' onClick={() => deleteIngrediente(el[1])}>X 삭제</span></div>
    }else if(el[3] === undefined){
      return <div className='showDeleteBtn__Ingredients'><span className='deleteBtn__Ingredient' onClick={() => deleteIngrediente(el[0])}>X 삭제</span><span className='deleteBtn__Ingredient' onClick={() => deleteIngrediente(el[1])}>X 삭제</span><span className='deleteBtn__Ingredient' onClick={() => deleteIngrediente(el[2])}>X 삭제</span></div>
    }else if(el[4] === undefined){
      return <div className='showDeleteBtn__Ingredients'><span className='deleteBtn__Ingredient' onClick={() => deleteIngrediente(el[0])}>X 삭제</span><span className='deleteBtn__Ingredient' onClick={() => deleteIngrediente(el[1])}>X 삭제</span><span className='deleteBtn__Ingredient' onClick={() => deleteIngrediente(el[2])}>X 삭제</span><span className='deleteBtn__Ingredient' onClick={() => deleteIngrediente(el[3])}>X 삭제</span></div>
    }else{
      return <div className='showDeleteBtn__Ingredients'><span className='deleteBtn__Ingredient' onClick={() => deleteIngrediente(el[0])}>X 삭제</span><span className='deleteBtn__Ingredient' onClick={() => deleteIngrediente(el[1])}>X 삭제</span><span className='deleteBtn__Ingredient' onClick={() => deleteIngrediente(el[2])}>X 삭제</span><span className='deleteBtn__Ingredient' onClick={() => deleteIngrediente(el[3])}>X 삭제</span><span className='deleteBtn__Ingredient' onClick={() => deleteIngrediente(el[4])}>X 삭제</span></div>
    }
  }

  //삭제하는 버튼
  
  const MouseOver =  async(event) => {
    event.target.style.background = 'skyblue'
    let text = event.target.textContent
    let data = await axios.get('http://localhost:4000/ingredient').then((res) => res.data)
    let filtered = data.filter((el) => el.name === text)
    setExContent(filtered[0].keep_method)
  }
  function MouseOut(event) {
    event.target.style.background = ''
    setExContent('')
  }
  return (
    <div className='ingredient__Container'>
      <h3 className='ingredient__title'>식재료 리스트</h3>
      <section className='ingredients__List'>
          {division.map((el) => {
            return <div key={uuidv4()} className='grocery_row'>
              {makeEl(el)}
              {userInfo.admin ? makeDelete(el) : null}
            </div>
          })}
      </section>
      <section className='Storage__method'>
        <h4 className='method__description'>식재료 보관방법</h4>

        {userInfo.admin ? <span><input onKeyUp={(e) => onChangeName(e)} type='text' placeholder='재료이름을 입력해주세요' className='inputCss'></input>
        <input onKeyUp={(e) => onChangeMethod(e)} type='text' placeholder='보관법을 작성해주세요' className='inputCss'>
          </input><button onClick={addIngredients} className='addButton'>+</button></span> : null}
        
        <div className='method__explain'>{exContent}</div>
      </section>
    </div>
  )
}