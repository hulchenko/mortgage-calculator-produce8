import React from 'react';

const OutputTable = (props) => {
  let totalAmount = props.mortgageLengthProp * props.resultPaymentProp;
  console.log(isNaN(totalAmount));
  const RenderTable = () => {
    let content = [];
    for (let i = 1; i <= props.mortgageLengthProp; i++) {
      totalAmount = (totalAmount - props.resultPaymentProp).toFixed(2);
      content.push(
        <div
          key={i}
          style={{
            display: 'flex',
            width: '350px',
          }}
        >
          <p style={{ width: '100px', textAlign: 'center' }}>{i}</p>
          <p style={{ width: '155px', textAlign: 'center' }}>
            {`$${props.resultPaymentProp}`}
          </p>
          <p style={{ width: '50px', textAlign: 'left' }}>
            {`$${Math.abs(totalAmount)}`}
          </p>
        </div>
      );
    }
    return content;
  };

  return (
    <div
      style={{
        boxShadow: '0px 0px 10px #777',
        borderRadius: '5px',
        opacity: '0.9',
      }}
    >
      <div
        style={{
          display: 'flex',
          height: '5rem',
          background: '#fff',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            border: '1px solid #ccc',
            justifyContent: 'center',
            alignItems: 'center',
            color: '#333',
            width: '175px',
          }}
        >
          <h5>Total Amount</h5>
          <p style={{ fontSize: '1.5rem', color: 'darkorange' }}>
            {isNaN(totalAmount) ? '' : `$${totalAmount.toFixed(2)}`}
          </p>
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            border: '1px solid #ccc',
            justifyContent: 'center',
            alignItems: 'center',
            color: '#333',
            width: '175px',
          }}
        >
          <h5>Total Payments</h5>
          <p style={{ fontSize: '1.5rem', color: 'darkorange' }}>
            {props.mortgageLengthProp}
          </p>
        </div>
      </div>
      <div
        style={{
          border: '1px solid #ccc',
          maxHeight: '30vh',
          overflow: 'overlay',

          background: '#fff',
        }}
      >
        <div
          style={{
            display: 'flex',
            width: '350px',
            justifyContent: 'space-evenly',
            borderBottom: '1px solid #777',
          }}
        >
          <h3 style={{ color: '#333' }}>Payment</h3>
          <h3 style={{ color: '#333' }}>Amount</h3>
          <h3 style={{ color: '#333' }}>Paid Out</h3>
        </div>
        <RenderTable />
      </div>
    </div>
  );
};

export default OutputTable;
