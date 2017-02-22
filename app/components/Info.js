import { h } from 'preact'
import displayDate from '../helpers/display-date'

const Info = props => {
  let infoClasses = ['info']
  if (props.showInfo) infoClasses.push('show')

  return (
    <div class={infoClasses.join(' ')}>
      <p class="info-text">
        {props.explanation}
      </p>
    </div>
  )
}

export default Info
