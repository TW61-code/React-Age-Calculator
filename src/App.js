import './App.css';
import { useState } from "react";
import { motion } from "framer-motion";

function App() {

  const [dayValue,   setDayValue] = useState();
  const [monthValue, setMonthValue] = useState();
  const [yearValue, setYearValue] = useState();
  const [daysOld, setDaysOld] = useState("--");
  const [monthsOld, setMonthsOld] = useState("--");
  const [yearsOld, setYearsOld] = useState("--");
  const [errors, setErrors] = useState({});

  // Create an object to store error values when user interactions are not valid
  const newErrors = {};

  function daysInMonth(month, year) {
    const daysInMonths = {
      1: 31,
      //feb has 29 on each leap year
      2: isLeapYear(year) ? 29 : 28, 
      3: 31,
      4: 30,
      5: 31,
      6: 30,
      7: 31,
      8: 31,
      9: 30,
      10: 31,
      11: 30,
      12: 31
    }
    return daysInMonths[month];
  }

  function handleDayValueChange(e) {
    e.preventDefault();
    setDayValue(e.target.value.length === 3 ? e.target.value.slice(0, 2) : e.target.value);
    // Clear error value when user starts typing.
    setErrors(prev => ({...prev, dayInput: ""}))
  }

  function handleMonthValueChange(e) {
    e.preventDefault();
    setMonthValue(e.target.value.length === 3 ? e.target.value.slice(0, 2) : e.target.value);
    // Clear error value when user starts typing.
    setErrors(prev => ({...prev, monthInput: ""}))
  }

  function handleYearValueChange(e) {
    e.preventDefault();
    setYearValue(e.target.value.length === 5 ? e.target.value.slice(0, 4) : e.target.value);
    // Clear error value when user starts typing.
    setErrors(prev => ({...prev, yearInput: ""}))
  }

  function isLeapYear(year) {
    return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
  }

  function calculateAge(e) {
    
    e.preventDefault();

    const day = parseInt(dayValue);
    const month = parseInt(monthValue);
    const year = parseInt(yearValue);

    const currentDate = new Date();
    const birthday = new Date(year, month - 1, day);

    let yearsOld = currentDate.getFullYear() - birthday.getFullYear();
    let monthsOld = currentDate.getMonth() - birthday.getMonth();
    let daysOld = currentDate.getDate() - birthday.getDate();

    if (isNaN(day) || day > daysInMonth(month, year) || day < 1) {
      newErrors.dayInput = `Must be a valid day`;
    } else if (day > currentDate.getDate() && month >= currentDate.getMonth() + 1 && year === currentDate.getFullYear()) {
      newErrors.dayInput = `Must be a past date`
    }
    if (isNaN(month) || month > 12 || month < 1) {
      newErrors.monthInput = "Must be a valid month";
    } else if (month > currentDate.getMonth() + 1 && year === currentDate.getFullYear()) {
      //prevent a future date
      newErrors.monthInput = `Must be a past date`;
    }
    if (isNaN(year) || year > currentDate.getFullYear()) {
      newErrors.yearInput = "Must be in the past";
    } else if (year < 1900) {
      newErrors.yearInput = "1900 is minnimum year";
    } else if (isLeapYear(year) && month === 2 && day === 29) {
      setErrors(prev => ({...prev, dayInput: ""}))
    }

    if (Object.keys(newErrors).length) {
      setErrors(newErrors);
      return;
    }

    if (daysOld < 0) {
      monthsOld--;
      const prevMonth = (currentDate.getMonth() - 1 + 12) % 12;
      const prevMonthYear = prevMonth === 11 ? currentDate.getFullYear() - 1 : currentDate.getFullYear();
      daysOld += daysInMonth(prevMonth + 1, prevMonthYear);
    } 
    
    if (monthsOld < 0) {
      yearsOld--;
      monthsOld += 12;
    }

    setDaysOld(daysOld);
    setMonthsOld(monthsOld);
    setYearsOld(yearsOld);
  }

  return (
    <div className="App">
      <form onSubmit={calculateAge}>
        <motion.div 
          
          className="input-container"
        >  
          <label style={{color: errors.dayInput && "hsl(0, 100%, 67%)"}}>DAY</label>
          <input type="text" 
                 className={Object.keys(newErrors).length ? "invalid" : "date-input"}
                 value={dayValue} 
                 onChange={handleDayValueChange}
                 style={{border: errors.dayInput && "1px solid hsl(0, 100%, 67%)",}}
                 autoFocus
          />
          {errors.dayInput && <p>{errors.dayInput}</p>}
        </motion.div>

        <div className="input-container">
          <label style={{color: errors.monthInput && "hsl(0, 100%, 67%)"}}>MONTH</label>
          <input type="text" 
                 value={monthValue} 
                 onChange={handleMonthValueChange}
                 style={{border: errors.monthInput && "1px solid hsl(0, 100%, 67%)"}}
          />
          {errors.monthInput && <p>{errors.monthInput}</p>}
        </div>

        <div className="input-container">
          <label style={{color: errors.yearInput && "hsl(0, 100%, 67%)"}}>YEAR</label>
          <input type="text" 
                 value={yearValue} 
                 onChange={handleYearValueChange}
                 style={{border: errors.yearInput && "1px solid hsl(0, 100%, 67%)"}}   
          />
          {errors.yearInput && <p>{errors.yearInput}</p>}
        </div>

        <button className="submit-btn">Submit</button>
      </form>

      <main>
        <div className="display-age-container">
          <h1><span>{yearsOld}</span><i>years</i></h1>
          <h1><span>{monthsOld}</span><i>months</i></h1>
          <h1><span>{daysOld}</span><i>days</i></h1>
        </div>
      </main>
    </div>
  );
}

export default App;
