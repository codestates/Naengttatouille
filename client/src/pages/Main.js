import './Main.css';
import React, { useState } from 'react';
import Ingredients from '../components/Ingredients';
import Refrigerator from '../components/Refrigerator';
import Recipe from '../components/Recipe';

export default function Main({ isLogin, userInfo }) {
  const [guestRefrigerator, setGuestRefrigerator] = useState(['당근', '양배추', '깐 마늘', '대파', '양파', '브로콜리']);
  const [recipeTags, setRecipeTags] = useState([]);
  const [state, setState] = useState(true)
  const handleRecipeTags = (str, tag) => {
    if (str === 'add') setRecipeTags([...recipeTags, tag]);
    if (str === 'delete') {
      setRecipeTags(recipeTags.filter((el) => el !== tag));
    }
    if (str === 'deleteAll') {
      setRecipeTags([]);
    }
  };
console.log(userInfo)
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
            setState={setState}
            state={state}

          />
        </div>
        <div id='grocery'>
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
