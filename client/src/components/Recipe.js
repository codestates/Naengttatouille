import React, { useState, useEffect } from 'react';
import './Recipe.css';
import thumbnailImg from '../thumbnail.png';
import { Link } from 'react-router-dom';

export default function Recipe({getYoutubeVideo, videoList, nextPageUrl}) {

  return (
    <div className='recipe'>
        <ul>
          {videoList?.map((video) => {
            return (
              <li key={video.videoId} className='recipe__content'>
                <a className='video' href={video.url} target='_blank' rel='noreferrer'>
                  <img src={video.videoThumbnail} alt='thumbnail' />
                </a>
                <a className='text' href={video.url} target='_blank' rel='noreferrer'>
                  <div className='title'>{video.videoTitle}</div>
                  <div className='description'>{video.videoDescription}</div>
                </a>
              </li>
            );
          })}
        </ul>
        <div className="button__more">
        <button onClick={() => getYoutubeVideo(nextPageUrl)}>더보기</button>
      </div>
      </div>
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
