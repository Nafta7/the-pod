const unsafeDates = require('../../unsafe-dates').dates

/*
Check to see if the date is included in the unsafe list of dates.
Unsafe dates are dates where the high resolution version of the image
for that date has an enourmous size and would cause problems to load
in most devices today.
*/
function isDateSafe(date) {
  const year = date.getFullYear()
  const month = ("0" + (date.getMonth()+1)).slice(-2)
  const day = ("0" + date.getDate()).slice(-2)
  const strDate = `${year}-${month}-${day}`

  return !(unsafeDates.indexOf(strDate) > -1)
}

export default isDateSafe
