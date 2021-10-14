import React, { useState, useEffect } from 'react';
import './Recipe.css';
import { Link } from 'react-router-dom';

export default function Recipe({ recipeTags, handleRecipeTags }) {
  const searchStr = `${recipeTags.join()} 레시피`;
  const handleTag = (str, tag) => {
    //태그관리
    handleRecipeTags(str, tag);
  };
  const [videoList, setVideoList] = useState([]);
  const [nextPageToken, setNextPageToken] = useState('');
  const [prePageToken, setPrePageToken] = useState('');
  const [pageTokens, setPageTokens] = useState([]);

  const maxResults = 3;
  const api_key = 'AIzaSyC1yj060gnMdEUBCnp-Sm1u20KuwxQ9b20';
  const searchUrl = `https://www.googleapis.com/youtube/v3/search?q=${searchStr}&type=$video&maxResults=${maxResults}&part=snippet&key=${api_key}`;
  const nextPageUrl = `https://www.googleapis.com/youtube/v3/search?q=${searchStr}&pageToken=${nextPageToken}&part=snippet&maxResults=${maxResults}&key=${api_key}`;

  // const pageTokensHandler = (data) => {
  //   if(!data.pre)
  // }

  function getYoutubeVideo(searchPage) {
    fetch(searchPage, {
      method: 'GET',
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log('🚀 ~ file: Recipe.js ~ line 28 ~ .then ~ data', data);
        const searchResult = data.items;
        setPrePageToken(data.prePageToken);
        setNextPageToken(data.nextPageToken); //다음 페이지 검색
        setPageTokens([...pageTokens, data.nextPageToken]);
        console.log('🚀 ~ file: Recipe.js ~ line 14 ~ Recipe ~ pageTokens', pageTokens);
        return searchResult.map((video) => {
          const videoId = video.id.videoId; //영상 id
          const videoTitle = video.snippet.title; //제목
          const videoDescription = video.snippet.description; //설명
          const videoThumbnail = video.snippet.thumbnails.high.url; //썸네일
          const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;
          return {
            videoId: videoId,
            videoTitle: videoTitle,
            videoDescription: videoDescription,
            videoThumbnail: videoThumbnail,
            url: videoUrl,
          };
        });
      })
      .then((data) => setVideoList(data))
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <ul className='selected'>
      <div className='recipe__tagAndSearch'>
        <span className='tag__box'>
          {recipeTags.map((tag) => {
            return (
              <span key={tag} className='tag' onClick={() => handleTag('delete', tag)}>
                {tag}
              </span>
            );
          })}
          <button className='unchecked_tags' onClick={() => handleTag('deleteAll', '')}>
            전체 선택 취소
          </button>
        </span>
        <button type='button' className='recipe_search' onClick={() => getYoutubeVideo(searchUrl)}>
          레시피 검색
        </button>
      </div>
      <section className='vid'>
        <ul className='vid__list'>
          {videoList.map((video) => {
            return (
              <li key={video.videoId} className='vid__one'>
                <a className='vid__info' href={video.url} target='_blank' rel='noreferrer'>
                  <img className='thumbnail' src={video.videoThumbnail} alt='thumbnail' />
                </a>
                <a className='vid__info' href={video.url} target='_blank' rel='noreferrer'>
                  <div className='title'>{video.videoTitle}</div>
                  <div className='description'>{video.videoDescription}</div>
                </a>
              </li>
            );
          })}
        </ul>
        <button className='more' onClick={() => getYoutubeVideo(nextPageUrl)}>
          더보기
        </button>
      </section>
    </ul>
  );
}
