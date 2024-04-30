// CategorySelector.js
import React from 'react';

const CategorySelector = ({ categories, showProducts }) => {
  return (
    <nav>
      {categories.map((category, index) => (
        <button key={index} onClick={() => showProducts(category)}>{category}</button>
      ))}
    </nav>
  );
};

export default CategorySelector;
