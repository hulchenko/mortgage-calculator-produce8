import React from 'react';
import Dashboard from './components/Dashboard';
import ApiComponent from './components/ApiComponent';
import backgroundImage from './img/background-image.jpg';

const App = () => {
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
      <Dashboard />
      <ApiComponent />
    </div>
  );
};

export default App;
