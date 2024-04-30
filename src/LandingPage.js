// LandingPage.js
import React from 'react';
import './LandingPage.css';
import image1O1 from './images/1O1-white.jpg'

const LandingPage = ({ goToMenu }) => {
  return (
    <div className="landing-page">

      <div className="landing-container">
        {/* <div className="landing-container-background-image-container">

        </div> */}

        <div className="logo-circle-container">
          <img src={image1O1} alt="header-image" className="logo-circle"/>
        </div>

        <div className="section-container">

          <div className="top-section-container">

            <div className="top-section-top-content">
              <h4>THE 1O1 Bogor</h4>
              <p>We won multiple awards as a leading hotel with great food</p>
            </div>

            <div className="top-section-mid-content"> 
              <div className="top-section-mid-content-location">
                <p>Jl. Suryakancana, Bogor</p>
                <button>Buka Peta</button>
              </div>
              <p>Sekarang Buka, Tutup 20:00</p>
              <p>Hubungi Restaurant</p>
            </div>
          </div>

          <div className="mid-section-container">
            <div className="mid-section-content">
              <p>Cara Order</p>
              <button>Lihat Tutorial</button>
            </div>
          </div>

          <div className="bottom-section-container">
            <button onClick={goToMenu} className="dine-btn">
              Makan Di Tempat
            </button>
          </div> 
          
        </div>

      </div>

    </div>
  );
};

export default LandingPage;
