import { h } from 'preact'

import ActionType from '../constants/ActionType'
import DaySort from '../constants/DaySort'

import isSameDay from '../helpers/is-same-day'
import displayDate from '../helpers/display-date'

import HomeIcon from '../icons/HomeIcon'
import PreviousIcon from '../icons/PreviousIcon'
import ShuffleIcon from '../icons/ShuffleIcon'
import NextIcon from '../icons/NextIcon'
import SettingsIcon from '../icons/SettingsIcon'

import Settings from './Settings'

const Nav = ({
  onActionClick,
  onSettingsClick,
  setSetting,
  date,
  settings,
  showSettings
}) => {
  const footerDate = date ? displayDate(date) : ''
  let disableNext = false,
    disablePrevious = false

  if (isSameDay(date, DaySort.LATEST)) disableNext = true
  if (date <= DaySort.OLDEST) disablePrevious = true

  return (
    <ul class="menu">
      <li>
        <a
          class="btn"
          disabled={disablePrevious}
          onClick={onActionClick.bind(null, ActionType.NEWEST)}
        >
          <HomeIcon />
          <span class="btn-text">The Pod</span>
        </a>
      </li>

      <li>
        <a
          class="btn"
          disabled={disablePrevious}
          onClick={onActionClick.bind(null, ActionType.PREVIOUS)}
        >
          <PreviousIcon />
          <span class="btn-text">Previous</span>
        </a>
      </li>

      <li>
        <a class="btn">
          <span class="">{footerDate}</span>
        </a>
      </li>

      <li>
        <a
          class="btn"
          disabled={disableNext}
          onClick={e => (disableNext ? null : onActionClick(ActionType.NEXT))}
        >
          <NextIcon />
          <span class="btn-text">Next</span>
        </a>
      </li>

      <li>
        <a class="btn" onClick={onActionClick.bind(null, ActionType.SHUFFLE)}>
          <ShuffleIcon />
          <span class="btn-text">Shuffle</span>
        </a>
      </li>

      <li class={`menu-item-settings`}>
        <a
          class={`btn btn-settings ${showSettings ? 'open' : ''}`}
          onClick={onSettingsClick}
        >
          <SettingsIcon />
        </a>
        <Settings
          active={showSettings}
          setSetting={setSetting}
          settings={settings}
        />
      </li>
    </ul>
  )
}

export default Nav
