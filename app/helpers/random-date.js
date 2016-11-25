// Jun 16, 1995 and Nov 20, 2016.
function random(){
  return randomDate(new Date(1995, 16, 6), new Date())
}

// Taken from stackoverflow user tomasz:
// http://stackoverflow.com/a/9035732/6598709
function randomDate(start, end) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()))
}

module.exports = random
