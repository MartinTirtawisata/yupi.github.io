// PopUpCart.js
import React, {useState, useEffect, useMemo} from 'react';
import './PopUpCart.css'; // Create this CSS file for styling

const PopUpCart = ({ cartItems,  goToCart, setCartItems, goToCheckout, updateItemQuantity }) => {
  
  const [isExpanded, setIsExpanded] = useState(false); // Controls the expanded state of the popup

  const handleToggleExpand = () => {
    setIsExpanded(!isExpanded);
  }

  console.log('isExpanded?',isExpanded);


  const calculateExtrasPrice = (selectedExtras) => {
    // console.log('calculateExtrasPrice is here', selectedExtras)
    return selectedExtras.reduce((total, extra) => {
      // include option price if exist
      // console.log('calculateExtrasPrice is here >> extra', extra)
      const optionPrice = extra.option ? extra.option.price : 0;
      // console.log('calculateExtrasPrice is here >> optionPrice', optionPrice)
      // console.log(total, optionPrice)
      return total + optionPrice;
      
    }, 0);
  };

  // calculate subtotal for single item including extra
  const calculateItemSubtotal = (item) => {
    // console.log('calculateItemSubtotal is here', item)
    const extrasPrice = calculateExtrasPrice(item.selectedExtras || []);
    // console.log('calculateItemSubtotal is here >>> extrasPrice', extrasPrice)
    const itemSubtotal = (item.price + extrasPrice) * item.quantity;
    // console.log('calculateItemSubtotal is here >>> itemSubtotal', itemSubtotal)
    return itemSubtotal.toLocaleString('en-US', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    })
    
    // toFixed, to 2 decimal places
  }

  const calculateTotal = (cartItems) => {
    return cartItems.reduce((total, item) => {
      //start with base price times the qty of item
      let itemTotal = item.price * item.quantity

      console.log('item is here', item);

      console.log('itemTotal is here', itemTotal);

      // add price of selected variant options
      if (item.selectedExtras && item.selectedExtras.length > 0) {
        const variantsTotal = item.selectedExtras.reduce((variantsSum, variant) => {
          // calculate total price of selected option within variant

          console.log('variant is here', variant);

          const optionTotal = variant.options.reduce((optionSum, option) => {

            console.log('option is here', option);
            console.log('option.selected is here', option.selected);
            console.log('optionSum is here', optionSum);
            console.log('option.price is here', option.price);

            return variant.options.length > 0 ? optionSum + option.price : optionSum; 
          }, 0);
          
          console.log('variantsSum is here',variantsSum)
          console.log('optionTotal is here',optionTotal)
        
          return variantsSum + optionTotal;
        }, 0);

        console.log('itemTotal is here',itemTotal)
        console.log('variantsTotal is here',variantsTotal)

        itemTotal += variantsTotal;
      }

      console.log('total is here',total)
      console.log('itemTotal is here',itemTotal)

      return (total + itemTotal)
    }, 0);
  };

  const total = calculateTotal(cartItems);


  const totalQuantity = useMemo(() => {return cartItems.reduce((total, item) => total + (item.quantity), 0)},[cartItems])

  const handleIncrease = (itemID) => {
    console.log('handle increase is here',itemID)
    const item = cartItems.find(key => key.uniqueKeyForCart === itemID);
    console.log('handle increase item is here', item)
    
    updateItemQuantity(itemID, item.quantity + 1);
    console.log("did qty plus 1?", item)
    setIsExpanded(true);

    
  }

  const handleDecrease = (uniqueKey) => {
    console.log('itemID is here when decreasing',uniqueKey)
    // Adjust quantities in cartItems
    setCartItems(currentItems =>
      currentItems.reduce((acc, item) => {
        if (item.uniqueKeyForCart === uniqueKey) {
          if (item.quantity > 1) {
            // Decrease the quantity
            acc.push({ ...item, quantity: item.quantity - 1 });
          }
          // If quantity is 1, do not add the item back to acc, effectively removing it
        } else {
          // Add other items as is
          acc.push(item);
        }
        return acc;
      }, [])
    );
    setIsExpanded(true);
  };





  return (
    <div className="floating-cart-container">

      {isExpanded ? (
        <div className="expanded-cart-details-container">

            {cartItems.map((item, index) => (
            <div key={index} className="expanded-cart-item">

                <img src={item.imageName} alt={item.name} className="expanded-cart-item-image"/>

                <div className="expanded-cart-item-description-container">
                  <h5>{item.name}</h5>
                  {/* <p>Price per item: Rp {item.price.toFixed(0)}</p> */}
                  {/* <p>Quantity: {item.quantity}</p> */}
                  {/* <p>Extras cost: Rp {calculateExtrasPrice(item.selectedExtras || []).toFixed(0)}</p> */}

                  <div className="price-and-quantity-control-container">  
                    <div className="price">
                      <p>{calculateItemSubtotal(item)}</p>
                    </div>
                    
                    <div className="quantity-control-in-popup-cart">
                      <button onClick={() => handleDecrease(item.uniqueKeyForCart, Math.max(1, item.quantity - 1))}>-</button>
                      <span>{item.quantity}</span>
                      <button onClick={() => handleIncrease(item.uniqueKeyForCart, item.quantity + 1)}>+</button>
                    </div>

                  </div>

                  {/* <p>${calculateItemSubtotal(item)} x {item.quantity}</p> */}
                </div>

            </div>







            ))}

            {/* <div className="total">
                <strong>Total: {total}</strong>
            </div> */}
        

            <div className="quick-summary-container">
              <div className="quick-summary-details" onClick={handleToggleExpand}>
                <span className="item-count-badge" onClick={handleToggleExpand}> {totalQuantity}</span>
                <span className="description-shopping-cart" onClick={handleToggleExpand}>{totalQuantity} items have been ordered</span>
                <span className="total-popup-cart" onClick={handleToggleExpand}><strong>Total Cart: {total.toLocaleString('en-US', { style: 'currency', currency: 'IDR',minimumFractionDigits: 0 })} </strong></span>
              </div>
        
              <div className="settle-payment-container">
                <span className="settle-payment" onClick={goToCheckout}>Payment</span>  
              </div>
            
            </div>

        </div>
      ) : (

        // this is the cart summary, non-expanded

        <div className="quick-summary-container">
            <div className="quick-summary-details" onClick={handleToggleExpand}>
              <span className="item-count-badge" onClick={handleToggleExpand}> {totalQuantity}</span>
              <span className="description-shopping-cart" onClick={handleToggleExpand}>{totalQuantity} items have been ordered</span>
              <span className="total-popup-cart" onClick={handleToggleExpand}><strong>Total Cart: {total.toLocaleString('en-US', { style: 'currency', currency: 'IDR',minimumFractionDigits: 0 })} </strong></span>
            </div>
            

            <div className="settle-payment-container">
              <span className="settle-payment" onClick={goToCheckout}>Payment</span>  
            </div>
            
        </div>
      )}

      
    
    </div>
  );
};

export default PopUpCart;

