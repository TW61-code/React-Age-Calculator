import './App.css';
import Input from "./Input.jsx";
import { motion } from "framer-motion";
import HandleValueChange from "./HandleValueChange.jsx";
import SetErrors from './SetErrors.js';
import { useState } from "react";

function App() {

  const [dayValue,   setDayValue] = useState();
  const [monthValue, setMonthValue] = useState();
  const [yearValue, setYearValue] = useState();
  const [daysOld, setDaysOld] = useState('--');
  const [monthsOld, setMonthsOld] = useState('--');
  const [yearsOld, setYearsOld] = useState('--');
  const [errors, setErrors] = useState({});
  const [rotate, setRotate] = useState(false);

  function animateNumbers(finalValue, setValue) {

    let currentValue = 0;

    const interval = setInterval(() => {

      currentValue += 1;
      setValue(currentValue);

      if (currentValue >= finalValue) {
        clearInterval(interval);
      }
    }, 20);
  }

  // Create an object to store error values when user interactions are not valid
  let newErrors = {};

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

  function isLeapYear(year) {
    return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
  }

  function calculateAge(e) {
    
    e.preventDefault();

    let day = parseInt(dayValue);
    let month = parseInt(monthValue);
    let year = parseInt(yearValue);

    let currentDate = new Date();
    const birthday = new Date(year, month - 1, day);

    let yearsOld = currentDate.getFullYear() - birthday.getFullYear();
    let monthsOld = currentDate.getMonth() - birthday.getMonth();
    let daysOld = currentDate.getDate() - birthday.getDate();

    SetErrors({
      day: day,
      month: month,
      year: year,
      newErrors: newErrors,
      currentDate: currentDate,
      //setErrors is setErrors so don't declare?
      setErrors,
      isLeapYear,
      daysInMonth: daysInMonth
  })

  //stop the function before displaying the calculations if there is an error from the form.
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

    animateNumbers(yearsOld, setYearsOld);
    animateNumbers(monthsOld, setMonthsOld);
    animateNumbers(daysOld, setDaysOld);

  }

  return (
    <div className="App"> 
      <form onSubmit={calculateAge}>
        <Input 
          onChange={(e) => HandleValueChange({
            e,
            maxLength: 3,
            setValue: setDayValue,
            setRotate,
            setErrors,
            rotate,
            error: "dayInput"
          })}
          placeHolder="DD"
          label="DAY"
          value={dayValue}
          error={errors.dayInput}
          rotate={rotate}
          onRotate={() => setRotate(!rotate)}
        />

        <Input 
          onChange={(e) => HandleValueChange({
            e,
            maxLength: 3,
            setValue: setMonthValue,
            setRotate,
            setErrors,
            rotate,
            error: "monthInput"
          })}
          placeHolder="MM"
          label="MONTH"
          value={monthValue}
          error={errors.monthInput}
          rotate={rotate}
        />

        <Input 
          onChange={(e) => HandleValueChange({
            e,
            maxLength: 5,
            setValue: setYearValue,
            setRotate,
            setErrors,
            rotate,
            error: "yearInput"
          })}   
          placeHolder="YYYY"       
          label="YEAR"
          value={yearValue}
          error={errors.yearInput}
          rotate={rotate}
        />
      
        <motion.button
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.8 }}
          transition={{ type: "spring", stiffness: 200 }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="46" height="44" viewBox="0 0 46 44">
          <g fill="none" stroke="#FFF" strokeWidth="2">
            <path d="M1 22.019C8.333 21.686 23 25.616 23 44M23 44V0M45 22.019C37.667 21.686 23 25.616 23 44"/>
          </g>
          </svg>
        </motion.button>
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
