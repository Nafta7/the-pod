import APIConstants from '../constants/APIConstants'
import randomInt from '../../app/helpers/random-int'
const fixture = require('../fixture-data')

function getLatest(){
  var p = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(fixture)
    }, AppConstants.DEV_TIMEOUT)
  })

  return p
}

function getByDate(date){
  return getByDateCall(date)
  .then((data) => {
    if (APIConstants.TEST_FAILURE)
      throw new Error("Error")
    else
      return data
  })
}

function getByDateCall(date){
  var arr = Array.apply(null, Array(7))
  arr.forEach((item, i) => arr[i] = `images/img_${i+1}.jpg`)
  let image = randomInt(1, 7)
  fixture.hdurl = arr[image-1]
  fixture.url = arr[image-1]

  let p = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(fixture)
    }, APIConstants.DEV_TIMEOUT)
  })

  return p
}

module.exports = {
  getLatest,
  getByDate
}
