import MediaType from '../constants/MediaType'

const key = require('../../credentials').api_key

const baseUrl = 'https://api.nasa.gov/planetary/apod?'
const keyParam = `api_key=${key}`

function getByDate(date){
  const newDate = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`
  const url = `${baseUrl}${keyParam}&date=${newDate}`
  return fetch(url)
    .then(res => {
      if (!res.ok)
        throw Error(res.statusText)
      return res
    }).then(res => res.json())
    .then(data => {
      if (data.media_type !== MediaType.IMAGE) {
        return Promise.reject(
          new Error(`media type invalid. type: ${data.media_type}`)
        )
      }
      data.hdurl = data.hdurl.replace('http', 'https')
      data.url = data.url.replace('http', 'https')
      return data
    })
    .catch(err => {
      throw err
    })
}

module.exports = getByDate
