function tomorrow(date) {
  var tomorrow = new Date(date)
  tomorrow.setDate(tomorrow.getDate() + 1)
  return tomorrow
}

module.exports = tomorrow
