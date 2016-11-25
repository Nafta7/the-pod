function normalizeDate(day) {
  var date = new Date(day.getTime() + day.getTimezoneOffset() * 60000)
  date.setHours(0,0,0,0)
  return date
}

export default normalizeDate
