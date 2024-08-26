import './App.css';
import Input from "./Input.jsx";
import HandleValueChange from "./HandleValueChange.jsx";
import { useState } from "react";

function App() {

  const [dayValue,   setDayValue] = useState();
  const [monthValue, setMonthValue] = useState();
  const [yearValue, setYearValue] = useState();
  const [daysOld, setDaysOld] = useState("--");
  const [monthsOld, setMonthsOld] = useState("--");
  const [yearsOld, setYearsOld] = useState("--");
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
          label="YEAR"
          value={yearValue}
          error={errors.yearInput}
          rotate={rotate}
        />
      
        <button>SUBMIT</button>
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
