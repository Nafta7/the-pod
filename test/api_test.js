const test = require('tape')
var fetchMock = require('fetch-mock')
const getLatest = require('../src/api').getLatest

let fixtureData = require('./fixture-data')

// Patch the fetch() global to always return the same value for GET
// requests to all URLs.
fetchMock.get('*', fixtureData)

getLatest().then(function(data) {
  console.log(['got data', data]);
});
