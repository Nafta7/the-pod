const config = require('../../appconfig')
import AppConstants from '../constants/AppConstants'

let getByDateBridge = function getByDateBridge(){
  return (config.mode === AppConstants.DEV_MODE)
    ? require('../../test/helpers/api_fixture')
    : require('../helpers/api')
}()

export default getByDateBridge
