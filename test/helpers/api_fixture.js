import APIConstants from '../constants/APIConstants'
import randomInt from '../../app/helpers/random-int'
const fixture = require('../fixture-data')
import isSameDay from '../../app/helpers/is-same-day'
import daysBetween from './days-between'

var images = Array.apply(null, Array(7))
images.forEach((item, i) => (images[i] = `images/img_${i + 1}`))
images = images.reverse()

function getByDate(date) {
  return getByDateCall(date).then(data => {
    if (APIConstants.TEST_FAILURE) throw new Error('Error')
    else return data
  })
}

function getByDateCall(date) {
  var today = new Date()
  var day = Math.abs(daysBetween(today, date) % 7)

  fixture.hdurl = `${images[day]}_hd.jpg`
  fixture.url = `${images[day]}.jpg`
  fixture.date = date

  let p = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(fixture)
    }, APIConstants.API_DELAY)
  })

  return p
}

module.exports = getByDate
