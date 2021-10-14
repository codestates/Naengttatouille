import './Main.css';
import React, { useState } from 'react';
import Ingredients from '../components/Ingredients';
import Refrigerator from '../components/Refrigerator';
import Recipe from '../components/Recipe';
import Search from '../components/Search';

export default function Main({ isLogin, userInfo }) {
  const [guestRefrigerator, setGuestRefrigerator] = useState(['당근', '양상추', '토마토', '애호박', '양파', '가지']);
  const [recipeTags, setRecipeTags] = useState([]);
  const [state, setState] = useState(true);
  const handleRecipeTags = (str, tag) => {
    if (str === 'add' && !recipeTags.includes(tag)) setRecipeTags([...recipeTags, tag]);
    if (str === 'delete') {
      setRecipeTags(recipeTags.filter((el) => el !== tag));
    }
    if (str === 'deleteAll') {
      setRecipeTags([]);
    }
  };

  const [showRecipe, setShowRecipe] = useState(false);
  const [videoList, setVideoList] = useState([]);

  const [nextPageToken, setNextPageToken] = useState('');
  const [prePageToken, setPrePageToken] = useState('');
  const [pageTokens, setPageTokens] = useState([]);

  const api_key = 'AIzaSyAVtvwSguR35KrUH0-V9QMxtOadCMYAqyQ';

  const searchStr = `${recipeTags.join()} 레시피`;
  const handleTag = (str, tag) => {
    //태그관리
    handleRecipeTags(str, tag);
  };

  const maxResults = 3;

  const searchUrl = `https://www.googleapis.com/youtube/v3/search?q=${searchStr}&type=$video&maxResults=${maxResults}&part=snippet&key=${api_key}`;
  const nextPageUrl = `https://www.googleapis.com/youtube/v3/search?q=${searchStr}&pageToken=${nextPageToken}&part=snippet&maxResults=${maxResults}&key=${api_key}`;

  function getYoutubeVideo(searchPage) {
    setShowRecipe(true);

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
    <>
      <div className='ingredients'>
        <div className='refrigerator'>
          <Refrigerator
            guestRefrigerator={guestRefrigerator}
            recipeTag={recipeTags}
            // setRecipeTag={setRecipeTags}
            handleRecipeTags={handleRecipeTags}
            isLogin={isLogin}
            userInfo={userInfo}
            setGuestRefrigerator={setGuestRefrigerator}
            setState={setState}
            state={state}
          />
        </div>
        <div className='grocery'>
          <Ingredients
            guestRefrigerator={guestRefrigerator}
            setGuestRefrigerator={setGuestRefrigerator}
            isLogin={isLogin}
            userInfo={userInfo}
            setState={setState}
            state={state}
          />
        </div>
      </div>
      <div className='search'>
        <Search
          getYoutubeVideo={getYoutubeVideo}
          handleTag={handleTag}
          recipeTags={recipeTags}
          searchUrl={searchUrl}
          setShowRecipe={setShowRecipe}
        />
      </div>
      <div>
        {showRecipe ? (
          <Recipe
            guestRefrigerator={guestRefrigerator}
            setGuestRefrigerator={setGuestRefrigerator}
            recipeTags={recipeTags}
            isLogin={isLogin}
            handleRecipeTags={handleRecipeTags}
            getYoutubeVideo={getYoutubeVideo}
            videoList={videoList}
            nextPageUrl={nextPageUrl}
          />
        ) : (
          <></>
        )}
      </div>
    </>
  );
}
