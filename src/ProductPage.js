// ProductPage.js
import React, { useState } from 'react';
import './ProductPage.css'
import plusImage from './images/favicon_io/plus-sign-add.png'

const ProductPage = ({ product, addToCart, goToMenu}) => {
  // globalExtras

  console.log(product, 'product is here')
  // console.log(product.variants ? product.variants[0] : 'no varriants', 'varriants here')
  // console.log(product.variants && product.variants[0] ? product.variants[0].options: 'no options','options here?')
 
  const [selectedExtras, setSelectedExtras] = useState([]);

  const handleOptionClick = (variantId, optionId) => {

    console.log(variantId, optionId, "variant ID and optionID is here")
    setSelectedExtras(prev => ({
        ...prev,
        [variantId]: optionId  // Toggle the selected option for the variant
    }));
};



  const handleExtraChange = (extra, isChecked, option) => {
    if (option) {
      console.log("option is here", option)
      // Handling nested option selection
      if (isChecked) {
        console.log("is checked?", isChecked)
        setSelectedExtras(prev => [...prev, { ...extra, option: { ...option } }]);
      } else {
        setSelectedExtras(prev => prev.filter(e => !(e.id === extra.id && e.option.id === option.id)));
      }
    } else {
      console.log( "Extra2 is here",extra)
      // Simple extra selection
      if (isChecked) {
        console.log(isChecked)
        setSelectedExtras(prev => [...prev, extra]);
      } else {
        setSelectedExtras(prev => prev.filter(e => e.id !== extra.id));
      }
    }
  };

  const handleAddToCart = () => {
    console.log("selectedExtra is here", selectedExtras)
    addToCart(product, selectedExtras);
    goToMenu(); // option to go back to navigation after adding to cart
  }




  return (
    <div className="product-page">
      <div className="product-information-container">

        <div className="product-page-image-container">
          <img src={product.imageName} alt={product.name} className="product-page-image" />
        </div>
        
        <div className="product-page-details-container">
          <div className="product-page-details">
            <h5>{product.name}</h5>
            <p>{product.description}</p>

            <div className="product-page-price-and-cart-container">
              <p className="product-page-price">Rp{product.price.toLocaleString('id-ID', { minimumFractionDigits: 0 })}</p>
              {product.isAvailable && (
              <div onClick={handleAddToCart} className="view-product-button-image-container">
                <img src={plusImage} alt="plus-sign-image" className="add-product-button"  />
              </div>  
              )}
            </div>
            {/* <p>Price: Rp{product.price.toLocaleString()}</p> */}


          </div>
        </div>

        {/* <div className="extras-container">
          <h3>Additionals</h3>
          {globalExtras.map(extra => (

            <div key={extra.id}>
              <label>
                <input type="checkbox" checked={selectedExtras.includes(extra.id)} onChange={(e) => handleExtraChange(extra.id, e.target.checked)}/>
                {extra.name}
                (+Rp{extra.price})
              </label>

            </div>
          ))}
        </div> */}

        {/* <div className="variants-container">
          <h5>Combo Meal Options:</h5>
            <div className="variants-options-container">
                {product.variants.map(variant => (

                    
                    <div key={variant.id} className="variants-options-container-items">
                        {variant.options.map(option => (

                            // div selected is here
                            <div key={option.id}
                                className={`option-item ${selectedExtras[variant.id] === option.id ? 'selected' : ''}`}
                                onClick={() => handleOptionClick(variant.id, option.id)}>
                                <img src={product.imageName} alt={option.name} className="variant-image" />

                                <div className="variant-details-container">
                                  <div className="variant-details">
                                    <p>{option.name}</p>
                                    <div className="variant-price-and-cart-container">
                                      <p className="variant-price">Rp{option.price.toLocaleString('id-ID', { minimumFractionDigits: 0 })}</p>
                                    </div>
                                  </div> 
                                </div>

                            </div>
                        ))}
                    </div>


                ))}
            </div>
        </div> */}

        {/* <div className="variants-container">
          <h5>Combo Meal</h5>

          {product.variants && product.variants.map(variant => (
            <div key={variant.id} className="variants-options-container">

              {variant.options && variant.options.map(option => (

                <div key={option.id} className="variants-options-container-items">
                  <div className="variant-image-container">
                    <img src={product.imageName} alt={product.name} className="variant-image" />
                  </div>
                          
                  <div className="variant-details-container">
                    <div className="variant-details">
                    <p>{option.name}</p>

                      <div className="variant-price-and-cart-container">
                        <p className="variant-price">Rp{option.price.toLocaleString('id-ID', { minimumFractionDigits: 0 })}</p>
                      
                      </div>
                      <p>Price: Rp{product.price.toLocaleString()}</p>


                    </div>
                  </div> 
                  <label>
                    <input
                      type="radio"
                      name={variant.id}
                      value={option.id}
                      checked={selectedExtras.some(e => e.id === variant.id && e.option && e.option.id === option.id)}
                      onChange={(e) => handleExtraChange(variant, e.target.checked, option)}
                    />
                    {option.name} (+ Rp {option.price})
                  </label>
                </div>




              ))}
            </div> 

           ))}
        </div> */}
          
        {/* <textarea
          placeholder="Catatan"
          maxLength="20"
        />
         */}
        {/* <button onClick={handleAddToCart} className="add-to-cart-btn">Add to Cart</button> */}

        <button onClick={goToMenu} className="back-btn">Back To Menu</button>

      </div>
    </div>
  );
};

export default ProductPage;
