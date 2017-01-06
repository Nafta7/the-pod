import DaySort from '../constants/DaySort'

function shuffleDate(){
  return randomDate(DaySort.OLDEST, DaySort.NEWEST)
}

// Taken from stackoverflow user tomasz:
// http://stackoverflow.com/a/9035732/6598709
function randomDate(start, end) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()))
}

module.exports = shuffleDate
