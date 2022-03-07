import React, { useState } from 'react';
import Dashboard from './components/Dashboard';
import ApiComponent from './components/ApiComponent';
import backgroundImage from './img/background-image.jpg';

const App = () => {
  const rates = [
    { province: 'BC', rate: '2.74' },
    { province: 'AB', rate: '2.69' },
  ];
  const [provinceRate, setProvinceRate] = useState(rates[0]);
  const provinceHandler = (e) => {
    switch (e.target.value) {
      case 'BC':
        setProvinceRate(rates[0]);
        break;
      case 'AB':
        setProvinceRate(rates[1]);
        break;
    }
  };

  const styles = {
    mainContainer: {
      backgroundImage: `url(${backgroundImage})`,
      backgroundSize: 'cover',
      height: '100vh',
      width: '100wh',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
    },
  };
  return (
    <div style={styles.mainContainer}>
      <h1
        style={{
          textAlign: 'center',
          paddingTop: '2rem',
          fontWeight: '900',
          fontSize: '3rem',
          textShadow: '0px 0px 3px #333',
          color: 'darkorange',
        }}
      >
        Mortgage Calculator
      </h1>
      <Dashboard provinceRate={provinceRate} />
      <ApiComponent />
      <div
        style={{
          position: 'absolute',
          top: '0',
          right: '0',
          margin: '3rem',
        }}
      >
        <select
          style={{
            backgroundColor: 'darkorange',
            color: '#fff',
            borderRadius: '5px',
            border: 'none',
            boxShadow: '0px 0px 5px #333',
            textShadow: '0px 0px 2px #333',
            cursor: 'pointer',
            fontSize: '0.9rem',
            letterSpacing: '1px',
            fontWeight: '900',
          }}
          onChange={(e) => provinceHandler(e)}
          name="province"
          id="province"
        >
          <option value="BC">BC</option>
          <option value="AB">AB</option>
        </select>
      </div>
    </div>
  );
};

export default App;
