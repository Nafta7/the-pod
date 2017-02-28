import { h } from 'preact'
import DaySort from '../constants/DaySort'
import isSameDay from '../helpers/is-same-day'

import HomeIcon from '../icons/HomeIcon'
import PreviousIcon from '../icons/PreviousIcon'
import ShuffleIcon from '../icons/ShuffleIcon'
import NextIcon from '../icons/NextIcon'
import InfoIcon from '../icons/InfoIcon'

const Nav = (props) => {
  let toggleButtonClasses = ['btn']
  if (props.showInfo)
    toggleButtonClasses.push('active')

  let date = props.date
  let disableNext = false, disablePrevious = false

  if (isSameDay(date, DaySort.LATEST))
    disableNext = true
  if (date <= DaySort.OLDEST)
    disablePrevious = true

  return (
    <ul class="menu">
      <li>
        <button type="submit" class="btn"
          disabled={disablePrevious}
          onClick={props.onHomeClick}>
          <div class="btn-container">
            <span class="btn-icon">
              <HomeIcon />
            </span>
            <span class="btn-text">
              The Pod
            </span>
          </div>
        </button>
      </li>
      <li>
        <button
          type="submit" class="btn"
          disabled={disablePrevious}
          onClick={props.onPreviousClick}>

          <div class="btn-container">
          <span class="btn-icon">
            <PreviousIcon />
          </span>
          <span class="btn-text">
            Previous
          </span>
          </div>
        </button>
      </li>
      <li>
        <button type="submit" class="btn"
          onClick={props.onShuffleClick}>
          <div class="btn-container">
            <span class="btn-icon">
              <ShuffleIcon />
            </span>
            <span class="btn-text">
              Shuffle
            </span>
          </div>
          </button>
      </li>
      <li>
        <button type="submit" class="btn"
          disabled={disableNext}
          onClick={props.onNextClick}>

          <div class="btn-container">
            <span class="btn-icon">
              <NextIcon />
            </span>
            <span class="btn-text">
              Next
            </span>
          </div>

        </button>
      </li>
      <li>
        <button type="submit"
          class={toggleButtonClasses.join(' ')}
          onClick={props.onToggleClick}>

          <div class="btn-container">
            <span class="btn-icon">
              <InfoIcon />
            </span>
            <span class="btn-text">
              Info
            </span>
          </div>
        </button>
      </li>
    </ul>
  )
}

export default Nav
