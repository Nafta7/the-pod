import { h } from 'preact'
import Constants from '../constants/Constants'
import isSameDay from '../helpers/is-same-day'

const Nav = (props) => {
  let date = props.date
  let disableNext = false, disablePrevious = false

  if (isSameDay(date, Constants.LATEST_DAY))
    disableNext = true
  if (date <= Constants.OLDEST_DAY)
    disablePrevious = true

  return (
    <div class="nav-wrapper">
      <h1 class="title">THE POD</h1>
      <nav class="nav nav-center">
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
      <nav class="nav nav-right">
        <ul class="menu">
          <li>
            <button type="submit" class="btn"
                    onClick={props.onToggleClick}>
              Toggle info
            </button>
          </li>
        </ul>
      </nav>

    </div>
  )
}

export default Nav
