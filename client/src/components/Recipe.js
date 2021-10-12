import React, { useState, useEffect } from 'react';
import './Recipe.css';
import thumbnailImg from '../thumbnail.png';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function Recipe({ recipeTags, handleRecipeTags }) {
  const searchStr = `${recipeTags.join()} 레시피`;
  const handleTag = (str, tag) => {
    //태그관리
    handleRecipeTags(str, tag);
  };
  const [videoList, setVideoList] = useState([]);

  axios.defaults.baseURL = 'https://www.googleapis.com/youtube/v3';
  const api_key = 'AIzaSyC1yj060gnMdEUBCnp-Sm1u20KuwxQ9b20';
  const getYoutubeVideo = async () => {
    const params = {
      key: api_key,
      part: 'snippet',
      q: searchStr,
      maxResults: 5,
      type: 'video',
    };

    await axios
      .get('/search', { params })
      .then((response) => {
        console.log(response.data);
        const searchResult = response.data.items;
        return searchResult.map((video) => {
          const videoId = video.id.videoId; //영상 id
          const videoTitle = video.snippet.title; //제목
          const videoDescription = video.snippet.description; //설명
          const videoThumbnail = video.snippet.thumbnails.high.url; //썸네일
          const url = `https://www.youtube.com/watch?v=${videoId}`;
          return {
            videoId: videoId,
            videoTitle: videoTitle,
            videoDescription: videoDescription,
            videoThumbnail: videoThumbnail,
            url: url,
          };
        });
      })
      .then((data) => setVideoList(data));
  };

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
        <button type='button' className='recipe_search' onClick={getYoutubeVideo}>
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
        <button className='more'>더보기</button>
      </section>
    </ul>
  );
}

// const dummyVideo = [
//   {
//     videoId: '0hYm1QOJZeo',
//     videoTitle: '양파 농가를 응원합니다! 만능양파볶음 대작전 1편: 양파 손질과 보관법 ㅣ 백종원의 쿠킹로그',
//     videoDescription: '수확량 급증으로 양파 가격이 폭락해 농가가 큰 시름에 빠졌습니다. ',
//     videoThumbnail: thumbnailImg,
//     url: `https://www.youtube.com/watch?v=0hYm1QOJZeo`,
//   },
//   {
//     videoId: '19EJML1oZWQ',
//     videoTitle: '🔥모든 음식에 빠지지 않지 ★ 양파레시피 15가지 🔥 [만개의레시피]',
//     videoDescription: 'BEST 요리는 여기에 ▶ https://bit.ly/2VOZ8z2',
//     videoThumbnail: thumbnailImg,
//     url: 'https://www.youtube.com/watch?v=19EJML1oZWQ',
//   },
// ];

// const getDummyVideo = () => {
//   setVideoInfo(dummyVideo);
// };
