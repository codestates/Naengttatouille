import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import './Refrigerator.css';
require('dotenv').config();

export default function Refrigerator({ 
  recipeTag, 
  handleRecipeTags, 
  guestRefrigerator, 
  isLogin,
  guestRecipeTags,
  setGuestRecipeTags,
  userInfo,
  setGuestRefrigerator,
  setState,
  state }) {
  const [userLists, setUserLists] = useState([])
  const [userListDivision, setUserListDivision] = useState([])
  let listDivision = [];
  let guestRefrigeratorList = [];

  const [refrigeratorAll, setRefrigeratorAll] = useState([])

  useEffect(async() => {
      let userLists1 = await axios.get(`http://localhost:4000/refrigerator`)
      .then((res) => {
        return res.data
      })
      let userList2 = await userLists1.map(el => el.name)
      function makeDivision(list) {
        let copy = list.slice(0);
        while (copy.length > 0) {
          if (copy.length >= 5) {
            listDivision.push(copy.splice(0, 5));
          } else if (copy.length < 5) {
            listDivision.push(copy.splice(0));
          }
        }
      }
      makeDivision(userList2)
      setUserListDivision(listDivision)
    
  },[state])

  const deleteRefrigerator = async(el) => {
    let refrigeratorNameData = userListDivision.reduce((acc, cur) => {
      return acc.concat(cur)
    })
    let refrigeratorData = await axios.get(`http://localhost:4000/refrigerator`)
    let filtered = refrigeratorData.data.filter(res => res.name === el)
    axios.delete(`http://localhost:4000/refrigerator/${filtered[0].ingredient_id}`)
    // setState(!state)
    window.location.reload()
  };

  const deleteGuestRefrigerator = (el) => {
    setGuestRefrigerator(guestRefrigerator.filter((data) => data !== el))
  }

  const addSearchList = (event) => {
    //main컴포넌트에서 함수 받아서 검색어 저장소에 추가
    const text = event.target.textContent;
    // setRecipeTag(recipeTag.push(text))
    handleRecipeTags('add', text);
  };
  


  const makeGuestRefrigerator = (guestRefrigerator) => {
    let copy = guestRefrigerator.slice(0);
    while (copy.length > 0) {
      if (copy.length >= 5) {
        guestRefrigeratorList.push(copy.splice(0, 5));
      } else if (copy.length < 5) {
        guestRefrigeratorList.push(copy.splice(0));
      }
    }
  };
  makeGuestRefrigerator(guestRefrigerator)


  function makeEl(el) {
    if (el[1] === undefined) {
      return (
        <div className='showRefrigerator'>
          <span onClick={addSearchList} className='Refrigerator__ingredient'>
            {el[0]}
          </span>
        </div>
      );
    } else if (el[2] === undefined) {
      return (
        <div className='showRefrigerator'>
          <span onClick={addSearchList} className='Refrigerator__ingredient'>
            {el[0]}
          </span>
          <span onClick={addSearchList} className='Refrigerator__ingredient'>
            {el[1]}
          </span>
        </div>
      );
    } else if (el[3] === undefined) {
      return (
        <div className='showRefrigerator'>
          <span onClick={addSearchList} className='Refrigerator__ingredient'>
            {el[0]}
          </span>
          <span onClick={addSearchList} className='Refrigerator__ingredient'>
            {el[1]}
          </span>
          <span onClick={addSearchList} className='Refrigerator__ingredient'>
            {el[2]}
          </span>
        </div>
      );
    } else if (el[4] === undefined) {
      return (
        <div className='showRefrigerator'>
          <span onClick={addSearchList} className='Refrigerator__ingredient'>
            {el[0]}
          </span>
          <span onClick={addSearchList} className='Refrigerator__ingredient'>
            {el[1]}
          </span>
          <span onClick={addSearchList} className='Refrigerator__ingredient'>
            {el[2]}
          </span>
          <span onClick={addSearchList} className='Refrigerator__ingredient'>
            {el[3]}
          </span>
        </div>
      );
    } else {
      return (
        <div className='showRefrigerator'>
          <span onClick={addSearchList} className='Refrigerator__ingredient'>
            {el[0]}
          </span>
          <span onClick={addSearchList} className='Refrigerator__ingredient'>
            {el[1]}
          </span>
          <span onClick={addSearchList} className='Refrigerator__ingredient'>
            {el[2]}
          </span>
          <span onClick={addSearchList} className='Refrigerator__ingredient'>
            {el[3]}
          </span>
          <span onClick={addSearchList} className='Refrigerator__ingredient'>
            {el[4]}
          </span>
        </div>
      );
    }
  }

  const makeDelete = (el) => {
    if (el[1] === undefined) {
      return (
        <div className='showDeleteBtn__Refrigerator'>
          <span className='deleteBtn__Refrigerator' onClick={isLogin ? () => deleteRefrigerator(el[0]) : () => deleteGuestRefrigerator(el[0])}>
            X 삭제
          </span>
        </div>
      );
    } else if (el[2] === undefined) {
      return (
        <div className='showDeleteBtn__Refrigerator'>
          <span className='deleteBtn__Refrigerator' onClick={isLogin? () => deleteRefrigerator(el[0]) : () => deleteGuestRefrigerator(el[0])}>
            X 삭제
          </span>
          <span className='deleteBtn__Refrigerator' onClick={isLogin ? () => deleteRefrigerator(el[1]) : () => deleteGuestRefrigerator(el[1])}>
            X 삭제
          </span>
        </div>
      );
    } else if (el[3] === undefined) {
      return (
        <div className='showDeleteBtn__Refrigerator'>
          <span className='deleteBtn__Refrigerator' onClick={isLogin? () => deleteRefrigerator(el[0]) : () => deleteGuestRefrigerator(el[0])}>
            X 삭제
          </span>
          <span className='deleteBtn__Refrigerator' onClick={isLogin ? () => deleteRefrigerator(el[1]) : () => deleteGuestRefrigerator(el[1])}>
            X 삭제
          </span>
          <span className='deleteBtn__Refrigerator' onClick={isLogin ? () => deleteRefrigerator(el[2]) : () => deleteGuestRefrigerator(el[2])}>
            X 삭제
          </span>
        </div>
      );
    } else if (el[4] === undefined) {
      return (
        <div className='showDeleteBtn__Refrigerator'>
          <span className='deleteBtn__Refrigerator' onClick={isLogin? () => deleteRefrigerator(el[0]) : () => deleteGuestRefrigerator(el[0])}>
            X 삭제
          </span>
          <span className='deleteBtn__Refrigerator' onClick={isLogin ? () => deleteRefrigerator(el[1]) : () => deleteGuestRefrigerator(el[1])}>
            X 삭제
          </span>
          <span className='deleteBtn__Refrigerator' onClick={isLogin ? () => deleteRefrigerator(el[2]) : () => deleteGuestRefrigerator(el[2])}>
            X 삭제
          </span>
          <span className='deleteBtn__Refrigerator' onClick={isLogin ? () => deleteRefrigerator(el[3]) : () => deleteGuestRefrigerator(el[3])}>
            X 삭제
          </span>
        </div>
      );
    } else {
      return (
        <div className='showDeleteBtn__Refrigerator'>
          <span className='deleteBtn__Refrigerator' onClick={isLogin? () => deleteRefrigerator(el[0]) : () => deleteGuestRefrigerator(el[0])}>
            X 삭제
          </span>
          <span className='deleteBtn__Refrigerator' onClick={isLogin ? () => deleteRefrigerator(el[1]) : () => deleteGuestRefrigerator(el[1])}>
            X 삭제
          </span>
          <span className='deleteBtn__Refrigerator' onClick={isLogin ? () => deleteRefrigerator(el[2]) : () => deleteGuestRefrigerator(el[2])}>
            X 삭제
          </span>
          <span className='deleteBtn__Refrigerator' onClick={isLogin ? () => deleteRefrigerator(el[3]) : () => deleteGuestRefrigerator(el[3])}>
            X 삭제
          </span>
          <span className='deleteBtn__Refrigerator' onClick={isLogin ? () => deleteRefrigerator(el[4]) : () => deleteGuestRefrigerator(el[4])}>
            X 삭제
          </span>
        </div>
      );
    }
  };
  //재료 데이터를 가져와서 클릭시 작동하는 함수에 재료의 데이터를 전해줘야함

  return (
    <div className='Refrigerator__Container'>
      <h3 className='Refrigerator__title'>나의 냉장고 속 재료</h3>
      <section className='My__refrigerator'>
        {isLogin ? userListDivision.map((el) => {
          return (
            <div key={uuidv4()} className='Refrigerator__grocery_row'>
              {makeEl(el)}
              {makeDelete(el)}
            </div>
          );
        }) : guestRefrigeratorList.map((el) => {
          return (
            <div key={uuidv4()} className='Refrigerator__grocery_row'>
              {makeEl(el)}
              {makeDelete(el)}
            </div>
          )
        })}
      </section>
    </div>
  );
}
