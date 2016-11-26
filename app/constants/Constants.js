import today from '../helpers/today'
import strToDate from '../helpers/strToDate'

const Constants = {
  LATEST_DAY: today(),
  OLDEST_DAY: strToDate('1995-06-16'),
  MAX_TRY: 3
}

export default Constants
