import today from '../helpers/today'

const DaySort = {
  NEWEST: today(),
  LATEST: null,
  OLDEST: new Date(1995, 1, 16)
}

export default DaySort
