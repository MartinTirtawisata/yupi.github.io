import React, { useState } from 'react';
import qrisImage from './images/qrisImage.png';
import './PaymentPage.css';

const PaymentPage = ({ cartItems, customerInfo, setCustomerInfo, goToMenu, handlePaymentSuccess }) => {
  // const [customerInfo, setCustomerInfo] = useState({
  //   name: '',
  //   roomNumber: ''
  //   // ... other fields if necessary
  // });

  // ... other state hooks

  // Calculate subtotal including quantity
  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  // Handle input change for customer info
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCustomerInfo(prevInfo => ({
      ...prevInfo,
      [name]: value
    }));
    console.log('hello2', customerInfo)
  };

  // Function to handle form submission
  const handleSubmit = event => {
    event.preventDefault();
    // Implement the logic to process payment here

    handlePaymentSuccess();
  };

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

  return (
    <div className="payment-page">

      <form>
        <div className="payment-page-container">

          
          <div className="payment-cart-location-container">
              <div className="payment-page-location-room">
                  <label htmlFor="roomNumber">Room Number:</label>
                  <input
                    type="text"
                    id="roomNumber"
                    name="roomNumber"
                    value={customerInfo.roomNumber}
                    onChange={handleInputChange}
                    placeholder="Enter your room number"
                    required
                  />
              </div>
          </div>

          <div className="payment-cart-recap-container">

            <h3>Order Confirmation</h3>
                      
              {cartItems.map(item => (    
                <div key={item.id} className="payment-cart-item">
                  <img src={item.imageName} alt={item.name} className="payment-cart-item-image"/>

                  <div className="payment-cart-item-description-container">
                    <h5>{item.name}</h5>
                    <div className="payment-cart-price-container">  
                      <div className="payment-cart-price">
                        <strong><p>{calculateItemSubtotal(item)}</p></strong>
                        <span className="payment-cart-quantity">x {item.quantity}</span>
                      </div>
                    </div>
                  </div>
              </div>

              ))}
            
            <div className="total-payment-cart-container">
              <span className="total-payment-cart" >Payable <span className="total-payment-cart-price">{total.toLocaleString('en-US', { style: 'currency', currency: 'IDR',minimumFractionDigits: 0 })} </span></span>      
              <button type="submit" onClick={handlePaymentSuccess} className="total-payment-cart-pay-button">To pay</button>
            </div>
          </div>
            



          {/* <div className="payment-method">
            <h3>Scan to Pay</h3>
            <p>Your default payment method is QRIS. Please scan the QR code below to pay.</p>
            <img src={qrisImage} alt="QRIS Code" className="qris-code" />
          </div> */}
            
            
          

        </div>
      </form>

      {/* <button type="button" onClick={goToMenu} className="back-to-cart-button">Back to Cart</button> */}
    </div>
  );
};

export default PaymentPage;