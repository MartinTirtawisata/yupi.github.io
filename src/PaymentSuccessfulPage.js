import React from 'react';
import './PaymentSuccessfulPage.css';
    

const PaymentSuccessfulPage = ({ cartItems, roomNumber, orderNumber, goBackToLanding, name }) => {

  console.log('received', roomNumber, name, orderNumber);

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

  // Assume serviceCharge and tax are percentages (e.g., 5% service charge, 10% tax)
  const serviceChargeRate = 0.05;
  const taxRate = 0.10;

  // Calculate subtotal
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  
  // Calculate service charge and tax
  const serviceCharge = subtotal * serviceChargeRate;
  const tax = subtotal * taxRate;

  // Calculate total
  const total = subtotal + serviceCharge + tax;

  return (
    <div className="payment-success-page">
      <div className="payment-success-container">

      {/* <h1>Order Confirmed for {name}</h1> */}

      <div className="payment-success-meal-status-container">
        <p>We are cooking up your meal</p>

        <span>The meal is being prepared, we will deliver it to your room once the meal is ready</span>
        
        <p className="payment-success-order-code">Order Code: {orderNumber}</p>
        
      </div>
      

      <div className="payment-success-order-details-container">
          <p>Room Number: {roomNumber}</p>
      </div>
 
      <div className="payment-success-item-list-container">  

        <h5>Order Summary</h5>

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

        <div className="service-charge">
          <span> Service Charge 5% </span>
          <span> Rp {serviceCharge.toLocaleString()} </span>
        </div>

        <div className="tax">
          <span> Tax 10% </span>
          <span> Rp {tax.toLocaleString()} </span>
        </div>

        <div className="total-amount">
          <span> Total </span>
          <span> Rp {total.toLocaleString()}</span>
        </div>

      </div>

      <button onClick={goBackToLanding}>
        Return To Landing
      </button>


      </div>
    </div>
  );
};

export default PaymentSuccessfulPage;
