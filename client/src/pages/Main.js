import './Main.css';
import React, { useState } from 'react';
import Ingredients from '../components/Ingredients';
import Refrigerator from '../components/Refrigerator';
import Recipe from '../components/Recipe';
import axios from 'axios';
import Search from '../components/Search';

export default function Main({ isLogin, userInfo }) {
  const [guestRefrigerator, setGuestRefrigerator] = useState(['당근', '양상추', '토마토', '애호박', '양파', '가지']);
  const [recipeTags, setRecipeTags] = useState([]);
  const handleRecipeTags = (str, tag) => {
    if (str === 'add'&& !recipeTags.includes(tag)) setRecipeTags([...recipeTags, tag]);
    if (str === 'delete') {
      setRecipeTags(recipeTags.filter((el) => el !== tag));
    }
    if (str === 'deleteAll') {
      setRecipeTags([]);
    }
  };

  const [showRecipe, setShowRecipe] = useState(false);
  const [videoList, setVideoList] = useState([]);

  const baseURL = 'https://www.googleapis.com/youtube/v3';
  const api_key = 'AIzaSyC1yj060gnMdEUBCnp-Sm1u20KuwxQ9b20';

  const getYoutubeVideo = async () => {

    setShowRecipe(true);

    const params = {
      key: api_key,
      part: 'snippet',
      q: searchStr,
      maxResults: 5,
      type: 'video',
    };

    await axios
      .get(`${baseURL}/search`, { params })
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

  const searchStr = `${recipeTags.join()} 레시피`;
  const handleTag = (str, tag) => {
    //태그관리
    handleRecipeTags(str, tag);
  };

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
          />
        </div>
        <div className='grocery'>
          <Ingredients
            guestRefrigerator={guestRefrigerator}
            setGuestRefrigerator={setGuestRefrigerator}
            isLogin={isLogin}
            userInfo={userInfo}
          />
        </div>
      </div>
      <div className='search'>
        <Search
          getYoutubeVideo={getYoutubeVideo} handleTag={handleTag}
          recipeTags={recipeTags}
          />
      </div>
      <div>
        {showRecipe ? <Recipe
          guestRefrigerator={guestRefrigerator}
          setGuestRefrigerator={setGuestRefrigerator}
          recipeTags={recipeTags}
          isLogin={isLogin}
          handleRecipeTags={handleRecipeTags}
          videoList={videoList}
        />: <></>}
      </div>
    </>
  );
}
