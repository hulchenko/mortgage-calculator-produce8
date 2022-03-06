import React, { useState } from 'react';

const Dashboard = () => {
  const [propertyPrice, setPropertyPrice] = useState();
  const [downPayment, setDownPayment] = useState();
  const [annualInterestRate, setAnnualInterestRate] = useState();
  const [amortizationPeriod, setAmortizationPeriod] = useState(5);
  const [paymentSchedule, setPaymentSchedule] = useState(0);
  const [valid, setValid] = useState({
    propertyPrice: false,
    downPayment: false,
    annualInterestRate: false,
    calculateTrigger: false,
  });
  const amortizationIncrements = [5, 10, 15, 20, 25, 30];

  const styles = {
    inputField: {
      display: 'flex',
      flexDirection: 'column',
      width: '300px',
    },
  };

  const propertyPriceHandler = (event) => {
    setPropertyPrice(event.target.value);
    if (
      event.target.value !== undefined &&
      event.target.value !== null &&
      event.target.value !== 0
    ) {
      setPropertyPrice(event.target.value);
      setValid({ ...valid, propertyPrice: true });
    } else {
      setValid({ ...valid, propertyPrice: false });
    }
  };

  const downPaymentHandler = (event) => {
    if (
      event.target.value !== undefined &&
      event.target.value !== null &&
      event.target.value < propertyPrice
    ) {
      setDownPayment(event.target.value);
      setValid({ ...valid, downPayment: true });
    } else {
      setValid({ ...valid, downPayment: false });
    }
  };

  // console.log(propertyPrice > downPayment);

  const annualInterestRateHandler = (event) => {
    if (
      event.target.value !== undefined &&
      event.target.value !== null &&
      event.target.value <= 10 &&
      event.target.value > 0
    ) {
      setAnnualInterestRate(event.target.value);
      setValid({ ...valid, annualInterestRate: true });
    } else {
      setValid({ ...valid, annualInterestRate: false });
    }
  };

  const amortizationPeriodHandler = (event) => {
    setAmortizationPeriod(event.target.value);
  };

  const paymentScheduleHandler = (event) => {
    setPaymentSchedule(event.target.value);
  };

  const calculateHandler = (event) => {
    console.log(`property price`, propertyPrice);
    console.log(`down Payment`, downPayment);
    console.log(`annual InterestRate`, annualInterestRate);
    console.log(`amortization Period`, amortizationPeriod);
    console.log(`payment Schedule`, paymentSchedule);
    setValid({ ...valid, calculateTrigger: true });

    // if (Object.values(valid).some((i) => i === false)) {
    //   return;
    // } else {

    // }
  };

  // console.log(Object.values(valid).some((i) => i === false));
  console.log(`validation: `, valid);

  return (
    <div>
      <div>
        <div style={styles.inputField}>
          <label>Property Price</label>
          <input
            placeholder={'0'}
            defaultValue={propertyPrice}
            onChange={(event) => propertyPriceHandler(event)}
            type="number"
          />
          <p
            style={{
              color: 'red',
              display:
                valid.propertyPrice === false && valid.calculateTrigger === true
                  ? 'block'
                  : 'none',
            }}
          >
            Value cannot be zero
          </p>
        </div>
        <div style={styles.inputField}>
          <label>Down Payment</label>
          <input
            placeholder={'0'}
            defaultValue={downPayment}
            onChange={(event) => downPaymentHandler(event)}
            type="number"
          />
          <p
            style={{
              color: 'red',
              display:
                valid.downPayment === false && valid.calculateTrigger === true
                  ? 'block'
                  : 'none',
            }}
          >
            Down payment value cannot be higher than property price
          </p>
        </div>
        <div style={styles.inputField}>
          <label>Annual Interest Rate</label>
          <input
            placeholder={'0'}
            defaultValue={annualInterestRate}
            onChange={(event) => annualInterestRateHandler(event)}
            type="number"
          />
          <p
            style={{
              color: 'red',
              display:
                valid.annualInterestRate === false &&
                valid.calculateTrigger === true
                  ? 'block'
                  : 'none',
            }}
          >
            Please indicate interest rate between 0 and 10%
          </p>
        </div>
        <div style={styles.inputField}>
          <label>Amortization Period</label>
          <select
            name="amortization"
            id="amortization"
            defaultValue={amortizationPeriod}
            onChange={(event) => amortizationPeriodHandler(event)}
          >
            {amortizationIncrements.map((i) => {
              return (
                <option value={i} key={i}>
                  {i}
                </option>
              );
            })}
          </select>
        </div>
        <div style={styles.inputField}>
          <label>Payment Schedule</label>
          <select
            name="schedule"
            id="schedule"
            onChange={(event) => paymentScheduleHandler(event)}
          >
            <option value={0}>Bi-Weekly</option>
            <option value={1}>Semi-Monthly</option>
            <option value={2}>Monthly</option>
          </select>
        </div>
        <button onClick={(e) => calculateHandler(e)}>Calculate</button>
      </div>
    </div>
  );
};

export default Dashboard;
