import React, { useState } from 'react';

const ApiComponent = () => {
  const [data, setData] = useState();
  const [display, setDisplay] = useState(false);

  const showApiMessage = () => {
    fetch(`https://www.boredapi.com/api/activity/`).then((res) =>
      res.json().then((res) => setData(res))
    );
    setDisplay(true);
  };

  return (
    <div
      style={{
        position: 'absolute',
        // background: 'orange',
        bottom: '0',
        opacity: '0.9',
      }}
    >
      <button
        style={{
          backgroundColor: 'darkorange',
          color: '#fff',
          //   margin: '1.5rem',
          padding: '1rem',
          borderRadius: '50px',
          width: '50px',
          border: 'none',
          boxShadow: '0px 0px 5px #333',
          textShadow: '0px 0px 2px #333',
          cursor: 'pointer',
          fontSize: '0.9rem',
          margin: '25px',
        }}
        onClick={() => showApiMessage()}
      >
        +
      </button>
      <p
        style={{
          display: display ? 'inline-block' : 'none',
          background: '#fff',
          height: '1.5rem',
          border: '#ccc',
          borderRadius: '0px 25px',
          boxShadow: '0px 0px 5px #777',
          paddingTop: '5px',
          textIndent: '7px',
          padding: '5px 15px 0px 15px',
        }}
      >
        {data !== undefined ? data.activity : ''}
      </p>
    </div>
  );
};

export default ApiComponent;
