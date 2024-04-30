// App.js
import React, { useState } from 'react';
import './App.css';
// import Header from './Header';
import LandingPage from './LandingPage';
import MenuPage from './MenuPage';
import PaymentSuccessfulPage from './PaymentSuccessfulPage';
import CartPage from './CartPage';
import PaymentPage from './PaymentPage';
import ProductPage from './ProductPage'; // Import ProductPage component
import PopUpCart from './PopUpCart'; // Import the Popup component
import cheeseburgerImage from './images/cheese-burger.png'
import caesarsaladImage from './images/caesar-salad.png'
import chickenwingImage from './images/chicken-wing.png'
import friesImage from './images/fries.png'
import pizzaImage from './images/pizza.png'
import chickenTeriyaki from './images/chicken-teriyaki.png'
import spaghetti from './images/spaghetti.png'
import grilledSalmon from './images/grilled-salmon.png'
import taco from './images/taco.png'
import veg from './images/vegetable-stir-fry.png'
import chocolateCake from './images/chocolate-cake.png'




function App() {
  const [currentPage, setCurrentPage] = useState('landing');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedProduct, setSelectedProduct] = useState('');
  const [cartItems, setCartItems] = useState([]);
  const [showPopup, setShowPopup] = useState(false); // State to control popup visibility
  
  // passing name & roomNumber from paymentpage to paymentsuccessfulpage
  const [customerInfo, setCustomerInfo] = useState({name: '', roomNumber:''});
  const [orderDetails, setOrderDetails] = useState({roomNumber:'', name:'', orderNumber:''})

  // const globalExtras = [
  //   { id: 'e1', name: 'Extra Cheese', price: 0.50 },
  //   { id: 'e2', name: 'Special Sauce', price: 0.75 }
  // ];

  const foodData = [
    {
      id: 1,
      name: 'Cheeseburger',
      category: 'Burgers',
      description: 'A juicy beef patty topped with melting cheese, crisp lettuce, ripe tomato, and a dollop of tangy sauce, all nestled within a toasted brioche bun.',
      price: 50000,
      isAvailable: true,
      imageName: cheeseburgerImage,
      quantity: 1,
      variants: [{id: 'v1', name: 'Bun Types', options: [{id: 'v11', name: 'Combo Fries & Drinks', price: 25000}]}],
      // icon: burgerIcon
    },
    {
      id: 2,
      name: 'Chicken Teriyaki',
      category: 'Asian Delights',
      description: 'Tender chicken slices glazed with a rich teriyaki sauce, served alongside a steaming bed of white rice garnished with sesame seeds and scallions.',
      price: 45000,
      isAvailable: true,
      imageName: chickenTeriyaki,
      // icon: dumplingIcon
    },
    {
      id: 3,
      name: 'French Fries',
      category: 'Burgers',
      description: 'Golden and crispy on the outside, soft and fluffy on the inside – these classic French fries are the perfect side kick to any meal.',
      price: 40000,
      isAvailable: true,
      imageName: friesImage,
      // icon: friesIcon
    },
    {
      id: 4,
      name: 'Caesar Salad',
      category: 'Salads',
      description: 'Crisp romaine lettuce tossed with creamy Caesar dressing, topped with rustic croutons, shaved Parmesan cheese, and a sprinkle of black pepper.',
      price: 45000,
      isAvailable: true,
      imageName: caesarsaladImage,
      quantity: 1,
      // icon: saladIcon
    },
    {
      id: 5,
      name: 'Margherita Pizza',
      category: 'Pizzas',
      description: 'This classic pizza is a simple yet delicious combination of homemade tomato sauce, fresh mozzarella, and basil on a crispy crust.',
      price: 70000,
      isAvailable: true,
      imageName: pizzaImage,
      quantity: 1,

      // icon: pizzaIcon
    },
    {
      id: 6,
      name: 'Chicken Wings',
      category: 'Appetizers',
      description: 'Indulge in our succulent chicken wings, coated in a spicy sauce and served with a cooling blue cheese dip for a burst of flavors.',
      price: 80000,
      isAvailable: true,
      imageName: chickenwingImage,
      quantity: 1,

      // icon: shrimpIcon
    },
    {
      id: 7,
      name: 'Spaghetti Bolognese',
      category: 'Pasta',
      description: 'Al dente spaghetti swirled with a hearty meaty Bolognese sauce, garnished with fresh herbs and grated Parmesan cheese.',
      price: 50000,
      isAvailable: true,
      imageName: spaghetti,
      quantity: 1,

      // icon: spaghettiIcon
    },
    {
      id: 8,
      name: 'Grilled Salmon',
      category: 'Seafood',
      description: 'Enjoy the rich flavors of our perfectly grilled salmon fillet, enhanced with a zesty lemon butter sauce and served with seasonal greens.',
      price: 65000,
      isAvailable: true,
      imageName: grilledSalmon,
      quantity: 1,

      // icon: seafoodIcon
    },
    {
      id: 9,
      name: 'Vegetable Stir Fry',
      category: 'Vegetarian',
      description: 'A vibrant mix of stir-fried seasonal vegetables, tossed in a light soy sauce, delivering a satisfying crunch with every bite.',
      price: 45000,
      isAvailable: true,
      imageName: veg,
      quantity: 1,
      
      // icon: vegetableIcon
    },
    {
      id: 10,
      name: 'Beef Tacos',
      category: 'Mexican',
      description: 'Savor the flavors of Mexico with our soft tacos filled with seasoned beef, fresh salsa, melted cheese, and crisp lettuce.',
      price: 55000,
      isAvailable: true,
      imageName: taco,
      quantity: 1,

      // icon: tac
    },
    {
      id: 11,
      name: 'Chocolate Cake',
      category: 'Desserts',
      description: 'Indulge in the decadence of our chocolate cake, featuring rich layers and a gooey chocolate center, topped with velvety chocolate ganache.',
      price: 30000,
      isAvailable: true,
      imageName: chocolateCake,
      quantity: 1,

      // icon: cakeIcon
    },
  ];
  

  // This function will group your food items by category
  const categorizedFoodData = foodData.reduce((acc, item) => {
    const { category, ...rest } = item;
    acc[category] = acc[category] || [];
    acc[category].push(rest);
    return acc;
  }, {});
  
  const getProductsByCategory = category => {
    return foodData.filter(item => item.category === category);
  };

  const showProducts = category => {
    setSelectedCategory(category);
    setCurrentPage('products');
  };

  const addToCart = (product, selectedExtras) => {
    console.log("app is here, selectedextras", selectedExtras)
    console.log("app is here, product", selectedExtras)

    const uniqueKeyForCart = product.id + selectedExtras.reduce((key, extra) => 
      key + extra.id + (extra.option ? extra.option.id : ''), '');
      console.log(uniqueKeyForCart)

    // Check if the product already exists in the cart
    const existingIndex= cartItems.findIndex(item => item.uniqueKeyForCart === uniqueKeyForCart);
    if (existingIndex > -1 ) {
      console.log('existingIndex', existingIndex)
      // Updated qty, if item same w extras and options exist
      
      const updatedCartItems = [...cartItems];
      console.log('updatedCartItems exist', updatedCartItems)

      updatedCartItems[existingIndex].quantity += 1;

      setCartItems(updatedCartItems);

    } else {

      console.log('CartItems does not exist')
      // If it doesn't exist, add the product to the cart with a quantity of 1
      setCartItems([...cartItems, { ...product,selectedExtras, quantity: 1, uniqueKeyForCart }]);
      
    }
    console.log(cartItems)
    setShowPopup(true); // Show the popup when an item is added
  };

  const handleClosePopup = () => {
    setShowPopup(false); // Hide the popup when the close button is clicked
  };

  const updateItemQuantity = (itemID, quantity) => {
    setCartItems(currentItems => currentItems.map(item => item.uniqueKeyForCart === itemID ?{ ...item, quantity:Math.max(1,quantity)} :item))
  }

  const removeFromCart = (itemId) => {
    setCartItems(currentItems => {
      // Find the item to see if we need to adjust quantity or remove it
      const existingItem = currentItems.find(item => item.id === itemId);
      if (existingItem && existingItem.quantity > 1) {
        // If item exists and quantity is greater than 1, decrease quantity
        return currentItems.map(item =>
          item.id === itemId ? { ...item, quantity: item.quantity - 1 } : item
        );
      } else {
        // If item exists and quantity is 1, remove it from the cart
        return currentItems.filter(item => item.id !== itemId);
      }
    });
  };

  const goToCheckout = () => {
    setCurrentPage('payment')
    setShowPopup(false);
  }
  
  

  const goBack = () => setCurrentPage('landing');

  const goToCart = () => setCurrentPage('cart');

  const goToMenu = () => setCurrentPage('menu');

  // Function to change pages
  const goToProductPage = (product) => {
    setSelectedProduct(product); // Assuming you have a state to keep track of the selected product
    setCurrentPage('products');
    setShowPopup(false);
  };

  const handlePaymentSuccess = () => {
    const orderNumber = Math.random().toString(36).substring(2,15);

    console.log('Cust Info:', customerInfo);

    setOrderDetails({
      roomNumber: customerInfo.roomNumber,
      name: customerInfo.name,
      orderNumber: orderNumber
    });

    console.log('Ord Deets:', {roomNumber: customerInfo.roomNumber, name: customerInfo.name, orderNumber: orderNumber});

    setCurrentPage('paymentSuccessful');
  };

  return (
    <div className="App">
      {currentPage === 'landing' && <LandingPage goToMenu={() => setCurrentPage('menu')} />}
      {currentPage === 'menu' && (<MenuPage categorizedFoodData={categorizedFoodData} addToCart={addToCart} goToCart={goToCart} goBack={goBack} goToProductPage={goToProductPage} />)}
      {currentPage === 'products' && <ProductPage cartItems={cartItems} updateItemQuantity={updateItemQuantity} setCartItems={setCartItems} product={selectedProduct} category={selectedCategory} products={getProductsByCategory(selectedCategory)} addToCart={addToCart} goToMenu={goToMenu} goToCart={goToCart} />}
      {/* globalExtras={globalExtras}  */}
      {currentPage === 'cart' && <CartPage cartItems={cartItems} updateItemQuantity={updateItemQuantity} setCartItems={setCartItems} removeFromCart={removeFromCart} goToCheckout={goToCheckout} goToMenu={goToMenu} />}
      {currentPage === 'payment' && <PaymentPage cartItems={cartItems} customerInfo={customerInfo} setCustomerInfo={setCustomerInfo} goToMenu={goToMenu} handlePaymentSuccess={handlePaymentSuccess} />}
      {currentPage === 'paymentSuccessful' && <PaymentSuccessfulPage roomNumber={orderDetails.roomNumber} name={orderDetails.name} orderNumber={orderDetails.orderNumber} goBackToLanding={goBack} cartItems={cartItems} />}
      {/* {currentPage !== 'paymentSuccessful' && <BottomNavigation />} */}

      {/* Your existing components and JSX */}
      {showPopup && <PopUpCart cartItems={cartItems} updateItemQuantity={updateItemQuantity} setCartItems={setCartItems} onClose={handleClosePopup} goToCart={goToCart} goToCheckout={goToCheckout} />}
      
    </div>
  );
}

export default App;
