// CartPage.js
import React, {useMemo} from 'react';
import './CartPage.css';

const CartPage = ({ cartItems, setCartItems, goToCheckout, goToMenu, updateItemQuantity }) => {
  // removeFromCart

  console.log(cartItems)
  // console.log(cartItems[0].price)

  // helper function to help calculate price of extras and options
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
    return itemSubtotal.toFixed(2);
    // toFixed, to 2 decimal places
  }

  // const calculateTotal = () => {
  //   return cartItems.reduce((total, item) => total + parseFloat(calculateItemSubtotal(item)),0 ).toFixed(2);
  // }

  // console.log('calculate total is here',calculateTotal);
  // console.log('calculate total is here',cartItems);

  //////////////////
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

      return total + itemTotal;
    }, 0);
  };

  const total = calculateTotal(cartItems);



  const handleIncrease = (itemID) => {
    console.log('handle increase is here',itemID)
    const item = cartItems.find(key => key.uniqueKeyForCart === itemID);
    console.log('handle increase item is here', item)
    updateItemQuantity(itemID, item.quantity + 1);
    console.log("did qty plus 1?", item)
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
  };
 
  


  // Function to calculate subtotal
  // const calculateSubtotal = () => {
  //   return cartItems.reduce((total, item) => total + parseFloat(item.price), 0);
  // };

  return (
    <div className="cart-container">
      <h1>Shopping Cart</h1>
      <div className="cart-items">
        {cartItems.map((item, index) => (
          
          <div key={index} className="cart-item">
            <img src={item.imageName} alt={item.name} className="item-image" />

            <div className="item-details">
              <h3>{item.name}</h3>  
              <p>Price per item: ${item.price.toFixed(2)}</p>
              <p>Quantity: {item.quantity}</p>
              <p>Extras cost: ${calculateExtrasPrice(item.selectedExtras || []).toFixed(2)}</p>
              <p>Subtotal: ${calculateItemSubtotal(item)}</p>

              {/* {item.selectedExtras.length > 0 && (
                <div>
                  <h4>Variants</h4>
                  {item.selectedExtras.map(item => (
                    item.options.map(extra => (
                      <p key={extra.id}> {extra.name}: +${extra.price} </p>
                    ))
                  ))}
                </div>
              )} */}

              <div className="quantity-control">
                <h3>{item.name}</h3>    
                <button onClick={() => handleDecrease(item.uniqueKeyForCart, Math.max(1, item.quantity - 1))}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => handleIncrease(item.uniqueKeyForCart, item.quantity + 1)}>+</button>
              </div>
          
            </div>

          </div>

        ))}
      </div>
      <div>
        <p>Subtotal: ${total}</p> {/* Display subtotal */}
        <button onClick={goToCheckout}>Proceed to Checkout</button>
        <button onClick={goToMenu}>Back to Menu</button>
      </div>
    </div>
  );
};

export default CartPage;
