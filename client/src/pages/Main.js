import './Main.css';
import React, { useState } from 'react';
import Ingredients from '../components/Ingredients';
import Refrigerator from '../components/Refrigerator';
import Recipe from '../components/Recipe';

export default function Main({ isLogin, userInfo }) {
  const [guestRefrigerator, setGuestRefrigerator] = useState(['당근', '양상추', '토마토', '애호박', '양파', '가지']);
  const [recipeTags, setRecipeTags] = useState([]);
  const handleRecipeTags = (str, tag) => {
    if (str === 'add') setRecipeTags([...recipeTags, tag]);
    if (str === 'delete') {
      setRecipeTags(recipeTags.filter((el) => el !== tag));
    }
    if (str === 'deleteAll') {
      setRecipeTags([]);
    }
  };

  return (
    <div>
      <div id='ingredients'>
        <div id='refrigerator'>
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
        <div id='grocery'>
          <Ingredients
            guestRefrigerator={guestRefrigerator}
            setGuestRefrigerator={setGuestRefrigerator}
            isLogin={isLogin}
            userInfo={userInfo}
          />
        </div>
      </div>
      <div id='recipe'>
        <Recipe
          guestRefrigerator={guestRefrigerator}
          setGuestRefrigerator={setGuestRefrigerator}
          recipeTags={recipeTags}
          isLogin={isLogin}
          handleRecipeTags={handleRecipeTags}
        />
      </div>
    </div>
  );
}
