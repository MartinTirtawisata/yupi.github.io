// MenuPage.js
import React, { useRef, useEffect } from 'react';
import './MenuPage.css';
import plusImage from './images/favicon_io/plus-sign-add.png'

import pizzaIcon from './images/favicon_io/pizza-icon.png'
import burgerIcon from './images/favicon_io/burger-icon.png'
import cakeIcon from './images/favicon_io/cake-icon.png'
import friesIcon from './images/favicon_io/fries-icon.png'
import spaghettiIcon from './images/favicon_io/spaghetti-icon.png'
import saladIcon from './images/favicon_io/salad-icon.png'
import dumplingIcon from './images/favicon_io/dumpling-icon.png'
import shrimpIcon from './images/favicon_io/shrimp-icon.png'
import vegetableIcon from './images/favicon_io/vegetable-icon.png'
import seafoodIcon from './images/favicon_io/seafood-icon.png'

const MenuPage = ({ categorizedFoodData, goToCart, goBack, goToProductPage }) => {

// Define a mapping from categories to icon paths
const categoryIcons = {
  Burgers: burgerIcon,
  'Asian Delights': dumplingIcon,
  Salads: saladIcon,
  Pizzas: pizzaIcon,
  Appetizers: friesIcon,
  Pasta: spaghettiIcon,
  Seafood: seafoodIcon,
  Vegetarian: vegetableIcon,
  Desserts: cakeIcon
};

  // console.log('food data here',categorizedFoodData)
  // Object.keys(categorizedFoodData).map((category, key, index) => {
  //     console.log(category)
  //     console.log('key is here',key)
  //     console.log(index)
  //  })
  
  const categoryRefs = useRef({});

  useEffect(() => {
    console.log(categoryRefs.current)
    Object.keys(categorizedFoodData).forEach(category => {categoryRefs.current[category] = categoryRefs.current[category] || React.createRef()})}, [categorizedFoodData]);

  const scrollToCategory = (categoryName) => {
    console.log(categoryName)

    console.log(categoryRefs.current)

    // console.log(categoryRefs.current[categoryName])
    const categoryRef = categoryRefs.current[categoryName]; 

    console.log(categoryRef)
    
    
      if (categoryRef && categoryRef.current){
        categoryRef.current.scrollIntoView({behavior:'smooth',block:'start'})}
  }

  return (
    <div className="menu-page">

      <div className="menu-container">

        <div className="top-categories-container-scroll">
          {Object.keys(categorizedFoodData).map(category => (
            <div key={category} className="top-category-item" onClick={() => scrollToCategory(category)}>
              {category}
              <img src={categoryIcons[category]} alt={'${category} Icon'} />
            </div>
          ))}
        </div>

        <div className="category-section-container">     
          {Object.keys(categorizedFoodData).map(category => ( 
            <div key={category} ref={categoryRefs.current[category]} className="category-section">
              <h5>{category}</h5>

              <div className="products-grid-container"> 
                {categorizedFoodData[category].map(product => (
                  
                  <div key={product.id} onClick={() => goToProductPage(product)} className={`product-item ${!product.isAvailable ? 'product-item--unavailable' : ''}`}>
                    {!product.isAvailable && <div className="product-overlay">Sold Out</div>}

                    <div className="product-image-container">
                      <img src={product.imageName} alt={product.name} className="product-image" onClick={() => goToProductPage(product)} />
                    </div>

                    <div className="product-details-container">
                      <div className="product-details">
                        <h5>{product.name}</h5>
                        <p>{product.description}</p>
                      </div>

                      <div className="price-and-cart-container">
                        <p className="product-price">Rp{product.price.toLocaleString('id-ID', { minimumFractionDigits: 0 })}</p>
                        {product.isAvailable && (
                        <div className="view-product-button-image-container">
                          <img src={plusImage} alt="plus-sign-image" className="view-product-button"  />
                        </div>  
                        // <button className="view-product-button">+</button>
                        )}
                      </div>
                                          
                    </div>

                    
                  </div>

                ))}
              </div>

            </div>
          ))}
        </div> 


        {/* <button onClick={goToCart} className="view-cart-button">View Cart</button> */}
        {/* <button onClick={goBack} className="back-button">Back to Landing Page</button> */}
      </div>
    </div>
  );
};

export default MenuPage;
