import { useState } from "react";
import "./Calculator.css";
import dollarSign from "../assets/icon-dollar.svg";
import peopleSign from '../assets/icon-person.svg'

const DEFAULT_AMOUNT = {
    'bill': 0,
    'peopleCount': 1,
    'amount': 0,
    'tipAmount': '0.00',
    'perPerson': '0.00',
}

export default function Calculator() {
    const [tips, setTips] = useState(DEFAULT_AMOUNT)
    const [error, setError] = useState(false)

    console.log(tips)
    const handleBillChange = (event) => {
        const newBillValue = parseFloat(event.target.value) || 0; // Ensure a valid number
        setTips((prevTips) => ({ ...prevTips, bill: newBillValue, amount: newBillValue }));
    };


    function calculateTipHandler(percentage){
        let tip = tips['bill'] 
        let calculatedAmount = Math.round((tip/(100/ percentage))  * 100)/100   
        let totalAmount = (tips['bill'] + calculatedAmount)
        setTips((prevTips) => ({ ...prevTips, tipAmount: calculatedAmount/ tips['peopleCount'], amount: totalAmount,}));
        calculateTotalAmount()
    }

    function calculateEachTipHandler(peopleCount){
        if(peopleCount < 1){
            setError(true)
        }else{
            setError(false)
        }
        let count = peopleCount < 1 ? 1 : peopleCount
        setTips((prevTips) => ({ ...prevTips, peopleCount: count, }));
        calculateTotalAmount()
    }


    function calculateTotalAmount() {
        setTips((prevTips) => {
          const cal = Math.round(prevTips['amount'] / prevTips['peopleCount'] * 100)/ 100;
          return { ...prevTips, perPerson: cal };
        });
      }

  return (
    <form className="calculator-form">
      <div className="tips-calculator">
        <div className="input-group">
          <label htmlFor="tip">Bill</label>
          <div className="input__wrapper">
            <img className="input__icon" src={dollarSign} alt="" />
            <input placeholder='0' type="number" name="tip" id="tip" onChange={handleBillChange}/>
          </div>
        </div>
        <div className="input-group">
          <label htmlFor="tipSelection">Select Tip %</label>
          <div className="tips-btn__group">
            <button type="button" onClick={() => calculateTipHandler(5)}>5%</button>
            <button type="button" onClick={() => calculateTipHandler(10)}>10%</button>
            <button type="button" onClick={() => calculateTipHandler(15)}>15%</button>
            <button type="button" onClick={() => calculateTipHandler(25)}>25%</button>
            <button type="button" onClick={() => calculateTipHandler(50)}>50%</button>
            <input id="tipSelection" name="tipSelection" className="discount__custom" type="number" placeholder="Custom" onChange={() => calculateTipHandler(event.target.value > 0 ? event.target.value : 1)}/>
          </div>
        </div>
        <div className={`input-group peopleCount ${error && 'error'}`}>
          <label htmlFor="peopleCOunt">Number of People <span>Can't be zero</span></label>
          <div className="input__wrapper">
            <img className="input__icon" src={peopleSign} alt="" />
          <input placeholder="0" type="number" name="peopleCOunt" id="peopleCOunt" onChange={(e) => calculateEachTipHandler(e.target.value)}/>
          </div>
        </div>
      </div>
      <div className="tips-result">
        <div className="tips-result__group">
          <div className="tip__group">
            <p className="tip-text">
              Tip Amount <br /> <span>/ person</span>
            </p>
            <p className="result">${tips['tipAmount']}</p>
          </div>
          <div className="tip__group">
            <p className="tip-text">
              Total <br /> <span>/ person</span>
            </p>
            <p className="result">${tips['perPerson']}</p>
          </div>
        </div>
        <button className="reset-btn" type="reset" onClick={() => setTips(DEFAULT_AMOUNT)}>Reset</button>
      </div>
    </form>
  );
}
