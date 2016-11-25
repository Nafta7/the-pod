import { h } from 'preact'
import Constants from '../constants/Constants'
import normalizeDate from '../helpers/normalize-date'

const Nav = (props) => {
  let date = props.date
  let disableNext = false, disablePrevious = false
  if (date >= Constants.LATEST_DAY)
    disableNext = true
  if (date <= Constants.OLDEST_DAY)
    disablePrevious = true

  return (
    <nav class="nav">
      <ul class="menu">
        <li>
          <button type="submit" class="btn" disabled={disablePrevious}
                  onClick={props.onPreviousClick}>
            Previous
          </button>
        </li>
        <li>
          <button type="submit" class="btn"
            onClick={props.onRandomClick}>
            Random</button>
        </li>
        <li>
          <button type="submit" class="btn" disabled={disableNext}
                  onClick={props.onNextClick}>
            Next
          </button>
        </li>
      </ul>
    </nav>
  )
}

export default Nav
