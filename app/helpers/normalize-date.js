function normalizeDate(day) {
  return new Date(day.getTime() + day.getTimezoneOffset() * 60000)
}

export default normalizeDate
