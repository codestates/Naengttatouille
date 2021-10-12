import axios from 'axios';
import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import './Refrigerator.css';

export default function Refrigerator({ recipeTag, handleRecipeTags, guestRefrigerator, isLogin }) {
  const list = [
    '당근',
    '양상추',
    '토마토',
    '애호박',
    '양파',
    '가지',
    '아스파라거스',
    '감자',
    '고구마',
    '고추',
    '야채',
    '이름',
  ];
  //  서버구현완료시 삭제
  let listDivision = [];
  let guestRefrigeratorList = [];

  let refrigeratorLists;

  const getRefrigeratorLists = () => {
    // axios.get('http://localhost:4000/refrigerator')//유저 아이디 줘야함
    // .then((res) => {
    //   refrigeratorLists에 정보 push
    // })
  };
  getRefrigeratorLists();

  const deleteRefrigerator = (el) => {
    // axios.delete('http://localhost:4000/refrigerator/ingredient' {ingredient_id: el.id})//유져아이디,재료아이디
    // .then((res) => {
    // })
  };

  const addSearchList = (event) => {
    //main컴포넌트에서 함수 받아서 검색어 저장소에 추가
    const text = event.target.textContent;

    // setRecipeTag(recipeTag.push(text))
    handleRecipeTags('add', text);
  };

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

  const makeGuestRefrigerator = (guestRefrigerator) => {
    let copy = guestRefrigerator.slice(0);
    while (copy.length > 0) {
      if (copy.length >= 5) {
        guestRefrigeratorList.push(copy.splice(0, 5));
      } else if (copy.length < 5) {
        listDivision.push(copy.splice(0));
      }
    }
  };

  // const makeList = (list, guestRefrigerator) => {
  //   if(isLogin){
  //     makeDivision(list)
  //   }else{
  //     makeGuestRefrigerator(guestRefrigeratorList)
  //   }
  // }
  // makeList(list, guestRefrigerator)
  makeDivision(list);

  function makeEl(el) {
    if (el[1] === undefined) {
      return (
        <div className='showRefrigerator'>
          <span onClick={addSearchList} className='ingredient'>
            {el[0]}
          </span>
        </div>
      );
    } else if (el[2] === undefined) {
      return (
        <div className='showRefrigerator'>
          <span onClick={addSearchList} className='ingredient'>
            {el[0]}
          </span>
          <span onClick={addSearchList} className='ingredient'>
            {el[1]}
          </span>
        </div>
      );
    } else if (el[3] === undefined) {
      return (
        <div className='showRefrigerator'>
          <span onClick={addSearchList} className='ingredient'>
            {el[0]}
          </span>
          <span onClick={addSearchList} className='ingredient'>
            {el[1]}
          </span>
          <span onClick={addSearchList} className='ingredient'>
            {el[2]}
          </span>
        </div>
      );
    } else if (el[4] === undefined) {
      return (
        <div className='showRefrigerator'>
          <span onClick={addSearchList} className='ingredient'>
            {el[0]}
          </span>
          <span onClick={addSearchList} className='ingredient'>
            {el[1]}
          </span>
          <span onClick={addSearchList} className='ingredient'>
            {el[2]}
          </span>
          <span onClick={addSearchList} className='ingredient'>
            {el[3]}
          </span>
        </div>
      );
    } else {
      return (
        <div className='showRefrigerator'>
          <span onClick={addSearchList} className='ingredient'>
            {el[0]}
          </span>
          <span onClick={addSearchList} className='ingredient'>
            {el[1]}
          </span>
          <span onClick={addSearchList} className='ingredient'>
            {el[2]}
          </span>
          <span onClick={addSearchList} className='ingredient'>
            {el[3]}
          </span>
          <span onClick={addSearchList} className='ingredient'>
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
          <span className='deleteBtn__Refrigerator' onClick={() => deleteRefrigerator(el[0])}>
            X 냉장고에서 지우기
          </span>
        </div>
      );
    } else if (el[2] === undefined) {
      return (
        <div className='showDeleteBtn__Refrigerator'>
          <span className='deleteBtn__Refrigerator' onClick={() => deleteRefrigerator(el[0])}>
            X 냉장고에서 지우기
          </span>
          <span className='deleteBtn__Refrigerator' onClick={() => deleteRefrigerator(el[1])}>
            X 냉장고에서 지우기
          </span>
        </div>
      );
    } else if (el[3] === undefined) {
      return (
        <div className='showDeleteBtn__Refrigerator'>
          <span className='deleteBtn__Refrigerator' onClick={() => deleteRefrigerator(el[0])}>
            X 냉장고에서 지우기
          </span>
          <span className='deleteBtn__Refrigerator' onClick={() => deleteRefrigerator(el[1])}>
            X 냉장고에서 지우기
          </span>
          <span className='deleteBtn__Refrigerator' onClick={() => deleteRefrigerator(el[2])}>
            X 냉장고에서 지우기
          </span>
        </div>
      );
    } else if (el[4] === undefined) {
      return (
        <div className='showDeleteBtn__Refrigerator'>
          <span className='deleteBtn__Refrigerator' onClick={() => deleteRefrigerator(el[0])}>
            X 냉장고에서 지우기
          </span>
          <span className='deleteBtn__Refrigerator' onClick={() => deleteRefrigerator(el[1])}>
            X 냉장고에서 지우기
          </span>
          <span className='deleteBtn__Refrigerator' onClick={() => deleteRefrigerator(el[2])}>
            X 냉장고에서 지우기
          </span>
          <span className='deleteBtn__Refrigerator' onClick={() => deleteRefrigerator(el[3])}>
            X 냉장고에서 지우기
          </span>
        </div>
      );
    } else {
      return (
        <div className='showDeleteBtn__Refrigerator'>
          <span className='deleteBtn__Refrigerator' onClick={() => deleteRefrigerator(el[0])}>
            X 냉장고에서 지우기
          </span>
          <span className='deleteBtn__Refrigerator' onClick={() => deleteRefrigerator(el[1])}>
            X 냉장고에서 지우기
          </span>
          <span className='deleteBtn__Refrigerator' onClick={() => deleteRefrigerator(el[2])}>
            X 냉장고에서 지우기
          </span>
          <span className='deleteBtn__Refrigerator' onClick={() => deleteRefrigerator(el[3])}>
            X 냉장고에서 지우기
          </span>
          <span className='deleteBtn__Refrigerator' onClick={() => deleteRefrigerator(el[4])}>
            X 냉장고에서 지우기
          </span>
        </div>
      );
    }
  };
  //재료 데이터를 가져와서 클릭시 작동하는 함수에 재료의 데이터를 전해줘야함

  return (
    <div>
      <h3 className='Refrigerator__title'>나의 냉장고 속 재료</h3>
      <section className='My__refrigerator'>
        {listDivision.map((el) => {
          return (
            <div key={uuidv4()} className='grocery_row'>
              {makeEl(el)}
              {makeDelete(el)}
            </div>
          );
        })}
      </section>
    </div>
  );
}
