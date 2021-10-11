import React from 'react';
import './Recipe.css';
import thumbnailImg from '../thumbnail.png';
export default function Recipe({ recipeTags, handleRecipeTags }) {
  const handleTag = (tag) => {
    //태그관리
    handleRecipeTags(tag);
  };
  return (
    <ul className='selected'>
      <div className='recipe__tagAndSearch'>
        <span className='tag__box'>
          {recipeTags.map((tag) => {
            return (
              <span className='tag' onClick={handleTag}>
                {tag}
              </span>
            );
          })}
          <button className='unchecked_tags'>전체 선택 취소</button>
        </span>
        <button type='button' className='recipe_search'>
          레시피 검색
        </button>
      </div>
      <section className='vid'>
        <ul className='vid__list'>
          <li className='vid__one'>
            <img className='thumbnail' src={thumbnailImg} alt='thumbnail' />
            <span className='vid__info'>
              <div className='title'>영상제목</div>
              <div className='description'>영상설명</div>
            </span>
          </li>
        </ul>
        <button className='more'>더보기</button>
      </section>
    </ul>
  );
}
