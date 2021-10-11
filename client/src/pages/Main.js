import './Main.css';
import React from 'react';
import Ingredients from '../components/Ingredients';
import Refrigerator from '../components/Refrigerator';
import Recipe from '../components/Recipe';

export default function Main() {
  return (
    <div>
      <div id='ingredients'>
        <div id='grocery'>
          <Ingredients />
        </div>
        <div id='refrigerator'>
          <Refrigerator />
        </div>
      </div>
      <div id='recipe'>
        <Recipe />
      </div>
    </div>
  );
}
