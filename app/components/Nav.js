import { h } from 'preact'
import DaySort from '../constants/DaySort'
import isSameDay from '../helpers/is-same-day'

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
        <button type="submit" class="btn" disabled={disablePrevious}
                onClick={props.onHomeClick}>
          <div class="btn-container">
            <span class="btn-icon">
              <svg class="icon" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
                <path d="M0 0h24v24H0z" fill="none"/>
              </svg>
            </span>
            <span class="btn-text">
              The Pod
            </span>
          </div>
        </button>
      </li>
      <li>
        <button type="submit" class="btn" disabled={disablePrevious}
                onClick={props.onPreviousClick}>
          <div class="btn-container">
          <span class="btn-icon">
            <svg class="icon" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
              <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
              <path d="M0 0h24v24H0z" fill="none"/>
          </svg>
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
              <svg class="icon" height="24" viewBox="0 0 24 24" width="24"      xmlns="http://www.w3.org/2000/svg">
                <path d="M0 0h24v24H0z" fill="none"/>
                <path d="M10.59 9.17L5.41 4 4 5.41l5.17 5.17 1.42-1.41zM14.5 4l2.04 2.04L4 18.59 5.41 20 17.96 7.46 20 9.5V4h-5.5zm.33 9.41l-1.41 1.41 3.13 3.13L14.5 20H20v-5.5l-2.04 2.04-3.13-3.13z"/>
              </svg>
            </span>
            <span class="btn-text">
              Shuffle
            </span>
          </div>
          </button>
      </li>
      <li>
        <button type="submit" class="btn" disabled={disableNext}
                onClick={props.onNextClick}>

          <div class="btn-container">
            <span class="btn-icon">
              <svg class="icon" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
                <path d="M0 0h24v24H0z" fill="none"/>
              </svg>
            </span>
            <span class="btn-text">
              Next
            </span>
          </div>

        </button>
      </li>
      <li>
        <button type="submit" class={toggleButtonClasses.join(' ')}
                onClick={props.onToggleClick}>

          <div class="btn-container">
            <span class="btn-icon">
              <svg class="icon" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 0h24v24H0z" fill="none"/>
                <path d="M11 17h2v-6h-2v6zm1-15C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zM11 9h2V7h-2v2z"/>
              </svg>
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
