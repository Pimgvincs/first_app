import React, { useState } from 'react'




const Calculator = () => {

  const [error, setError] = useState(''); /// error message
  const [userValues, setUserValues] = useState({ /// user values 
    amount: '',
    interest: '',
    years: '',
  })

  const [result, setResults] = useState({ /// result from user values
    monthlyPayment: '',
    totalPayment: '',
    totalInterest: '',
    isResult: false,
  })

  const calculateResults = ({amount, interest, years})=> { /// calculation
    const userAmount = Number(amount)
    const calculateInterest = Number(interest)/ 100 / 12;
    const calculatePayments = Number(years) *12;
    const x = Math.pow(1+ calculateInterest, calculatePayments);
    const monthly = (userAmount * x * calculateInterest) / (x-1);
      if(isFinite(monthly)) { /// Checks if number is not infinite
        const monthlyPaymentCaculated = monthly.toFixed (2)
        const totalPaymentCalculated = (monthly * calculatePayments).toFixed(2);
        const totalInterestCalculated = (monthly * calculatePayments - userAmount).toFixed(2);


        setResults ({ /// Set up results to display 
          monthlyPayment: monthlyPaymentCaculated,
          totalPayment: totalPaymentCalculated,
          totalInterest: totalInterestCalculated,
          isResult:true,
        })
      }
      return;
  }
  const isValid = () => { /// manage error messages
    const { amount, interest, years } = userValues;
    let actualError = '';
    /// Validate if there are values
    if (!amount || !interest || !years) {
      actualError = 'All the values are required';
    }
    /// Validade if the values are numbers
    if (isNaN(amount) || isNaN(interest) || isNaN(years)) {
      actualError = 'All the values must be a valid number';
    }
    /// Validade if the values are positive numbers
    if (
      Number(amount) <= 0 ||
      Number(interest) <= 0 ||
      Number(years) <= 0
    ) {
      actualError = 'All the values must be a positive number';
    }
    if (actualError) {
      setError(actualError);
      return false;
    }
    return true;
  };

  const handleInputChange = (event) => {
    setUserValues({ ...userValues, [event.target.name]: event.target.value })
  }
  const handleSubmitValues = (e) =>{ /// calculate values and shows errors
    e.preventDefault();
    if(isValid()) {
      setError('')
      calculateResults(userValues)
    }
  }
  /// Clear input fields
  const clearFields = () => {
    setUserValues({
      amount: '',
      interest: '',
      years: '',
    });

    setResults({
      monthlyPayment: '',
      totalPayment: '',
      totalInterest: '',
      isResult: false,
    });
  };

  



  return (
    <div>
      <div>
        <h1>Loan Calculator</h1>
        <p>{error}</p>
        <form onSubmit={handleSubmitValues}>
          {!result.isResult ? (
          <div className='form-items'>
            <div>
            <label id='label'>Amount:</label>
              <input
                type="text"
                name='amount'
                placeholder='Loan amount'
                value={userValues.amount}
                onChange={handleInputChange}
              />
            </div>
            <div>
            <label id='label'>Interest:</label>
              <input
                type="text"
                name='interest'
                placeholder='interest'
                value={userValues.interest}
                onChange={handleInputChange}
              />
            </div>
            <div>
            <label id='label'>Years:</label>
              <input
                type="text"
                name='years'
                placeholder='Years to repay'
                value={userValues.years}
                onChange={handleInputChange}
              />
            </div>
            <input type='submit' className='button'/>
          </div>
          ) : (
          <div className='form-items'>
            <h4>
              Loan amount: ${userValues.amount} <br /> Interest:{' '}
              {userValues.interest}% <br /> Years to repay: {userValues.years}
            </h4>
            <div>
              <label id='label'>Monthly Payment:</label>
              <input type='text' value={result.monthlyPayment} disabled />
            </div>
            <div>
              <label id='label'>Total Payment: </label>
              <input type='text' value={result.totalPayment} disabled />
            </div>
            <div>
              <label id='label'>Total Interest:</label>
              <input type='text' value={result.totalInterest} disabled />
            </div>
            <input 
            className='button'
            value='Calculate again'
            type='button'
            onClick={clearFields}
            />
          </div>
          )}
        </form>
        </div>
    </div>
  )
}

export default Calculator
