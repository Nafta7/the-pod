import normalizeDate from '../helpers/normalize-date'

const Constants = {
  LATEST_DAY: normalizeDate(new Date()),
  OLDEST_DAY: normalizeDate(new Date('1995-06-16')),
  MAX_TRY: 3
}

export default Constants
