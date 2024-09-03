
function SetErrors(
    {
        day,
        month,
        year,
        newErrors,
        currentDate,
        setErrors,
        isLeapYear,
        daysInMonth
    }
) {
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
        setErrors(prev => ({...prev, dayInput: ""}));
    }

}

export default SetErrors;