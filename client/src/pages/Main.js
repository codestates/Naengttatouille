import './Main.css';
import React, { useState } from 'react';
import Ingredients from '../components/Ingredients';
import Refrigerator from '../components/Refrigerator';
import Recipe from '../components/Recipe';

export default function Main({isLogin}) {

  const [guestRefrigerator, setGuestRefrigerator] = useState([])
  const [recipeTags, setRecipeTags] = useState([])

  const handleRecipeTags = (tag) => {
    setRecipeTags([...recipeTags,tag])
  };

  return (
    <div>
      <div id='ingredients'>
        <div id='grocery'>
          <Ingredients guestRefrigerator={guestRefrigerator} 
          setGuestRefrigerator={setGuestRefrigerator}
          isLogin={isLogin}
          guestRefrigerator={guestRefrigerator}/>
        </div>
        <div id='refrigerator'>
          <Refrigerator 
          guestRefrigerator={guestRefrigerator} 
          recipeTag={recipeTags}
          setRecipeTag={setRecipeTags}
          isLogin={isLogin} />
        </div>
      </div>
      <div id='recipe'>
        <Recipe guestRefrigerator={guestRefrigerator}
        setGuestRefrigerator={setGuestRefrigerator} 
        recipeTag={recipeTags}
        isLogin={isLogin}
        handleRecipeTags={handleRecipeTags} />
      </div>
    </div>
  );
}
