import React from 'react';
import './Search.css';

function Search({ recipeTags, handleTag, getYoutubeVideo, searchUrl }) {
  return (
    <>
          <div className='tag__container'>
        <div className='tag__box'>
        {recipeTags.length === 0 ? <div className='do_choose'>냉장고에서 재료를 선택해보세요!</div> : undefined}
          {recipeTags.map((tag) => {
            return (
            <a key={tag} href='#0' class='tag' onClick={() => handleTag('delete', tag)}>
                <em></em>
                <span>
                    {tag + ' ✘'}
                </span>
            </a>
            );
          })}
          </div>
        <div className='tagAndSearch'>
        <button type='button' className='uncheck_tags' onClick={() => handleTag('deleteAll', '')}>
            전체 선택 취소
          </button>
        {/* <button type='button' className='recipe_search' onClick={getYoutubeVideo}>
          레시피 검색
          </button> */}

        <button type='button' className='recipe_search' onClick={() => getYoutubeVideo(searchUrl)}>
          레시피 검색
        </button>
        {/* <button className='more' onClick={() => getYoutubeVideo(nextPageUrl)}>더보기</button> */}

      </div>
      </div>
    </>
  )
}

export default Search
