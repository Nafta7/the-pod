import { h } from 'preact'
import displayDate from '../helpers/display-date'

const Info = props => {
  let infoClasses = ['info']
  if (props.showInfo) infoClasses.push('show')

  return (
    <div class={infoClasses.join(' ')}>
      <h1 class="info-title">
        <span class="info-title-text">
          {props.title}
        </span>
        <span class="info-title-date">
          {displayDate(props.date)}
        </span>
      </h1>
      <p class="info-text">
        {props.explanation}
      </p>
    </div>
  )
}

export default Info
