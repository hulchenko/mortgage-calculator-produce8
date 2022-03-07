import React, { useState, useEffect } from 'react';
import OutputTable from './OutputTable';

const Dashboard = ({ provinceRate }) => {
  // console.log(`FROM DASHBOARD: `, provinceRate);
  const [propertyPrice, setPropertyPrice] = useState();
  const [downPayment, setDownPayment] = useState();
  const [annualInterestRate, setAnnualInterestRate] = useState(
    provinceRate.rate
  );
  const [amortizationPeriod, setAmortizationPeriod] = useState(5);
  const [paymentSchedule, setPaymentSchedule] = useState('0');
  const [valid, setValid] = useState({
    propertyPrice: false,
    downPayment: false,
    annualInterestRate: false,
  });
  const [mortgageLengthProp, setMortgageLengthProp] = useState();
  const [resultPaymentProp, setResultPaymentProp] = useState();
  const [calculateTrigger, setCalculateTrigger] = useState(false);
  const [outputTable, setOutputTable] = useState(false);
  const amortizationIncrementsArray = [5, 10, 15, 20, 25, 30];

  const styles = {
    inputDiv: {
      display: 'flex',
      flexDirection: 'column',
      width: '375px',
      paddingTop: '7px',
    },
    inputField: {
      border: '1px solid #ccc',
      height: '2rem',
      borderRadius: '5px',
      fontSize: '1.1rem',
      textIndent: '0.5rem',
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
      Number(event.target.value) > Number(propertyPrice) ||
      Number(event.target.value) < Number((propertyPrice * 10) / 100)
    ) {
      setValid({ ...valid, downPayment: false });
    } else {
      setDownPayment(event.target.value);
      setValid({ ...valid, downPayment: true });
    }
  };

  const annualInterestRateHandler = (event) => {
    if (
      event.target.value !== undefined &&
      event.target.value !== null &&
      event.target.value <= 10
    ) {
      setAnnualInterestRate(event.target.value);
      setValid({ ...valid, annualInterestRate: true });
    }
    if (event.target.value <= 0) {
      setAnnualInterestRate(event.target.value);
      setValid({ ...valid, annualInterestRate: false });
    }
    // } else {
    //   setValid({ ...valid, annualInterestRate: false });
    // }
  };

  useEffect(() => {
    // console.log(`triggered`);
    setAnnualInterestRate(provinceRate.rate);
    setValid({ ...valid, annualInterestRate: true });
  }, [provinceRate]);

  console.log(annualInterestRate);

  const amortizationPeriodHandler = (event) => {
    setAmortizationPeriod(event.target.value);
  };

  const paymentScheduleHandler = (event) => {
    setPaymentSchedule(event.target.value);
  };

  const calculateHandler = () => {
    setCalculateTrigger(true);
    //check validation
    if (Object.values(valid).some((i) => i === false)) {
      return;
    } else {
      // console.log(`property price`, propertyPrice);
      // console.log(`down Payment`, downPayment !== undefined ? downPayment : 0);
      // console.log(`annual InterestRate`, annualInterestRate);
      // console.log(`amortization Period`, amortizationPeriod);
      // console.log(`payment Schedule`, paymentSchedule);
      let paymentsType;
      switch (paymentSchedule) {
        case '0':
          paymentsType = 26;
          break;
        case '1':
          paymentsType = 24;
          break;
        case '2':
          paymentsType = 12;
          break;
      }

      let principleAmount =
        Number(propertyPrice) -
        (downPayment !== undefined ? Number(downPayment) : 0);
      let percentageRate =
        Number(annualInterestRate) / 100 / Number(paymentsType); // get rate from annual based on type of payments
      let mortgageLength = Number(amortizationPeriod) * Number(paymentsType); // get mortgage length in months
      // Math.pow(base, exponent) <- base number taken to the power of the given exponent
      let resultPayment = (
        (principleAmount * percentageRate) /
        (1 - Math.pow(1 + percentageRate, mortgageLength * -1))
      ).toFixed(2);
      // console.log(`PRINCIPLE: `, principleAmount);
      // console.log(`Percentage Rate: `, percentageRate);
      // console.log(`Mortgage Length: `, mortgageLength);
      // console.log(`RESULT: `, resultPayment);
      setMortgageLengthProp(mortgageLength);
      setResultPaymentProp(resultPayment);
      setOutputTable(true);
    }
    return null;
  };

  // console.log(`validation: `, valid);

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        paddingTop: '0.5rem',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          background: '#fff',
          opacity: '0.9',
          width: '450px',
          height: '425px',
          borderRadius: '5px',
          boxShadow: '0px 0px 10px #777',
        }}
      >
        <div style={styles.inputDiv}>
          <label style={{ paddingTop: '7px' }}>Property Price ($)</label>
          <input
            placeholder={'0'}
            defaultValue={propertyPrice}
            onChange={(event) => propertyPriceHandler(event)}
            type="number"
            style={styles.inputField}
          />
          <p
            style={{
              color: 'red',
              display:
                valid.propertyPrice === false && calculateTrigger === true
                  ? 'block'
                  : 'none',
            }}
          >
            <i>Value cannot be zero</i>
          </p>
        </div>
        <div style={styles.inputDiv}>
          <label>
            Down Payment ($)<i></i>
          </label>
          <input
            style={styles.inputField}
            placeholder={'0'}
            defaultValue={downPayment}
            onChange={(event) => downPaymentHandler(event)}
            type="number"
          />
          <p
            style={{
              color: 'red',
              display:
                valid.downPayment === false && calculateTrigger === true
                  ? 'block'
                  : 'none',
            }}
          >
            <i>10% min, 100% max</i>
          </p>
        </div>
        <div style={styles.inputDiv}>
          <label>Annual Interest Rate (%)</label>
          <input
            style={styles.inputField}
            placeholder={'0'}
            value={annualInterestRate}
            onChange={(event) => annualInterestRateHandler(event)}
            type="number"
          />
          <p
            style={{
              color: 'red',
              display:
                valid.annualInterestRate === false && calculateTrigger === true
                  ? 'block'
                  : 'none',
            }}
          >
            <i>higher than 0 and less or equal to 10%</i>
          </p>
        </div>
        <div style={styles.inputDiv}>
          <label>Amortization Period</label>
          <select
            style={styles.inputField}
            name="amortization"
            id="amortization"
            defaultValue={amortizationPeriod}
            onChange={(event) => amortizationPeriodHandler(event)}
          >
            {amortizationIncrementsArray.map((i) => {
              return (
                <option value={i} key={i}>
                  {i}
                </option>
              );
            })}
          </select>
        </div>
        <div style={styles.inputDiv}>
          <label>Payment Schedule</label>
          <select
            style={styles.inputField}
            name="schedule"
            id="schedule"
            onChange={(event) => paymentScheduleHandler(event)}
          >
            <option value={0}>Bi-Weekly</option>
            <option value={1}>Semi-Monthly</option>
            <option value={2}>Monthly</option>
          </select>
        </div>
        <button
          style={{
            backgroundColor: 'darkorange',
            color: '#fff',
            margin: '1.5rem',
            padding: '1rem',
            borderRadius: '25px',
            width: '150px',
            border: 'none',
            boxShadow: '0px 0px 5px #333',
            textShadow: '0px 0px 2px #333',
            cursor: 'pointer',
            fontSize: '0.9rem',
            letterSpacing: '1px',
            fontWeight: '900',
          }}
          onClick={() => calculateHandler()}
        >
          Calculate
        </button>
        <div
          style={{
            display: outputTable ? 'block' : 'none',
            paddingTop: '2rem',
          }}
        >
          <OutputTable
            mortgageLengthProp={mortgageLengthProp}
            resultPaymentProp={resultPaymentProp}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
