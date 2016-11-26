function isSameDay(day1, day2) {
  var newDay1 = new Date(day1)
  var newDay2 = new Date(day2)
  newDay1.setHours(0,0,0,0)
  newDay2.setHours(0,0,0,0)
  return newDay1 >= newDay2
}

export default isSameDay
