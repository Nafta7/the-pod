const key = require('../credentials').api_key

const url = 'https://api.nasa.gov/planetary/apod?'
const keyParam = `api_key=${key}`

function getLatest(){
  return fetch(`${url}${keyParam}`).then(res => res.json())
}

module.exports = {
  getLatest
}
