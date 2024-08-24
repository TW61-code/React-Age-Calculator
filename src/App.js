import './App.css';
import { useState } from "react";

function App() {

  const [birthdayDay, setBirthdayDay] = useState();
  const [birthdayMonth, setBirthdayMonth] = useState();
  const [birthdayYear, setBirthdayYear] = useState();
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

  function handleBirthdayDayChange(e) {
    e.preventDefault();
    setBirthdayDay(e.target.value);
    // Clear error value when user starts typing.
    setErrors(prev => ({...prev, dayInput: ""}))
  }

  function handleBirthdayMonthChange(e) {
    e.preventDefault();
    setBirthdayMonth(e.target.value);
    // Clear error value when user starts typing.
    setErrors(prev => ({...prev, monthInput: ""}))
  }

  function handleBirthdayYearChange(e) {
    e.preventDefault();
    setBirthdayYear(e.target.value);
    // Clear error value when user starts typing.
    setErrors(prev => ({...prev, yearInput: ""}))
  }

  function isLeapYear(year) {
    return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
  }

  function calculateAge(e) {

    e.preventDefault();

    const currentDate = new Date();
    const birthday = new Date(birthdayYear, birthdayMonth - 1, birthdayDay);

    let yearsOld = currentDate.getFullYear() - birthday.getFullYear();
    let monthsOld = currentDate.getMonth() - birthday.getMonth();
    let daysOld = currentDate.getDate() - birthday.getDate();

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

    setYearsOld(yearsOld);
    setMonthsOld(monthsOld);
    setDaysOld(daysOld);
  }

  if (birthdayDay > daysInMonth(birthdayMonth, birthdayYear)) {
    alert("yo");
  }

  return (
    <div className="App">
      <form onSubmit={calculateAge}>
        <div className="input-container">
          <label>DAY</label>
          <input type="text" value={birthdayDay} onChange={handleBirthdayDayChange}></input>
        </div>
        <div className="input-container">
        <label>MONTH</label>
          <input type="text" value={birthdayMonth} onChange={handleBirthdayMonthChange}></input>
        </div>
        <div className="input-container">
        <label>YEAR</label>
          <input type="text" value={birthdayYear} onChange={handleBirthdayYearChange}></input>
        </div>
        <button className="submit-btn">Submit</button>
      </form>

      <main>
        <div className="display-age-container">
          <h1><span>{yearsOld}</span> years</h1>
          <h1><span>{monthsOld}</span> months</h1>
          <h1><span>{daysOld}</span> days</h1>
        </div>
      </main>
    </div>
  );
}

export default App;
