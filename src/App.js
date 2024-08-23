import './App.css';
import { useState } from "react";

function App() {

  const [birthdayDay, setBirthdayDay] = useState();
  const [birthdayMonth, setBirthdayMonth] = useState();
  const [birthdayYear, setBirthdayYear] = useState();
  const [daysOld, setDaysOld] = useState("--");
  const [monthsOld, setMonthsOld] = useState("--");
  const [yearsOld, setYearsOld] = useState("--");

  function calculate(e) {

    e.preventDefault();

    const currentDate = new Date();
    const birthday = new Date(`${birthdayYear} / ${birthdayMonth} / ${birthdayDay}`);
    const diff = currentDate - birthday;

    const yearDiff = Math.floor(diff / 1000 / 60 / 60 / 24 / 365);
    const monthDiff = Math.floor((diff % (1000 * 60 * 60 * 24 * 365) / (1000 * 60 * 60 * 24 * 30)));
    const dayDiff = currentDate.getDate() - birthday.getDate();
    
    setYearsOld(yearDiff);
    setMonthsOld(monthDiff);
    setDaysOld(dayDiff)
  }

  return (
    <div className="App">
      <form onSubmit={calculate}>
        <div className="input-container">
          <label>DAY</label>
          <input type="text" value={birthdayDay} onChange={(e) => setBirthdayDay(e.target.value)}></input>
        </div>
        <div className="input-container">
        <label>MONTH</label>
          <input type="text" value={birthdayMonth} onChange={(e) => setBirthdayMonth(e.target.value)}></input>
        </div>
        <div className="input-container">
        <label>YEAR</label>
          <input type="text" value={birthdayYear} onChange={(e) => setBirthdayYear(e.target.value)}></input>
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
