import './App.css';
import Input from "./Input.jsx";
import { motion } from "framer-motion";
import HandleValueChange from "./HandleValueChange.jsx";
import { useState } from "react";

function App() {

  const [dayValue,   setDayValue] = useState();
  const [monthValue, setMonthValue] = useState();
  const [yearValue, setYearValue] = useState();
  const [daysOld, setDaysOld] = useState("--");
  const [monthsOld, setMonthsOld] = useState("--");
  let [yearsOld, setYearsOld] = useState("--");
  const [errors, setErrors] = useState({});
  const [rotate, setRotate] = useState(false);

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

    if (isNaN(day) || day < 1) {
      newErrors.dayInput = "This field is required"
    } else if (day > daysInMonth(month, year)) {
      newErrors.dayInput = `Must be a valid day`;
    } else if (day > currentDate.getDate() && month >= currentDate.getMonth() + 1 && year === currentDate.getFullYear()) {
      newErrors.dayInput = `Must be a past date`
    }
    if (isNaN(month) || month < 1) {
      newErrors.monthInput = "This field is required"
    } else if (month > 12) {
      newErrors.monthInput = "Must be a valid month";
    } else if (month > currentDate.getMonth() + 1 && year === currentDate.getFullYear()) {
      //prevent a future date
      newErrors.monthInput = `Must be a past date`;
    }
    if (isNaN(year) || year < 1) {
      newErrors.yearInput = "This field is required"
    } else if (year > currentDate.getFullYear()) {
      newErrors.yearInput = "Must be in the past";
    } else if (year < 1900) {
      newErrors.yearInput = "Year must be 1900 +";
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

    const counters = document.querySelectorAll("span");

    counters.forEach(counter => {
      let initialValue = 0;
      const finalValue = counter.dataset.count;

      console.log("final value", finalValue);

      const counting = setInterval(updateAge, 1);

      function updateAge() {
        setYearsOld(initialValue + 1);

        if (yearsOld >= finalValue) {
          clearInterval(counting);  
        }
      }
    })
  }

  // const years = parseInt(yearsOld);
  // console.log(years);

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
          <g fill="none" stroke="#FFF" stroke-width="2">
            <path d="M1 22.019C8.333 21.686 23 25.616 23 44M23 44V0M45 22.019C37.667 21.686 23 25.616 23 44"/>
          </g>
          </svg>
        </motion.button>
      </form>
      <main>
        <div className="display-age-container">
          <h1><span className="counter" data-count={yearsOld}>--</span><i>years</i></h1>
          <h1 data-count={monthsOld}><span>--</span><i>months</i></h1>
          <h1 data-count={daysOld}><span>--</span><i>days</i></h1>
        </div>
      </main>
    </div>
  );
}

export default App;
