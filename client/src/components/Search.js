import React, {useState} from 'react'

function Search({ recipeTags, handleRecipeTags, handleTag, getYoutubeVideo }) {

  return (
    <>
          <div className='tag__container'>
        <div className='tag__box'>
          {recipeTags.map((tag) => {
            return (
              <span key={tag} className='tag' onClick={() => handleTag('delete', tag)}>
                {tag + '  ✘'}
              </span>
            );
          })}
          </div>
        <div className='tagAndSearch'>
          <button className='uncheck_tags' onClick={() => handleTag('deleteAll', '')}>
            전체 선택 취소
          </button>
        <button type='button' className='recipe_search' onClick={getYoutubeVideo}>
          레시피 검색
          </button>
      </div>
      </div>
    </>
  )
}

export default Search
