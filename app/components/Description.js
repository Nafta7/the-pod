import { h } from 'preact'
import displayDate from '../helpers/display-date'

const Description = ({ explanation, showDescription }) => {
  return (
    <div class={`description ${showDescription ? 'show' : ''}`}>
      <p class="description-text">{explanation}</p>
    </div>
  )
}

export default Description
