import Constants from '../constants/Constants'

function randate(){
  return randomDate(Constants.OLDEST_DAY, Constants.LATEST_DAY)
}

// Taken from stackoverflow user tomasz:
// http://stackoverflow.com/a/9035732/6598709
function randomDate(start, end) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()))
}

module.exports = randate
