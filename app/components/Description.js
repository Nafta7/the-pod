import { h } from 'preact'

const Description = ({ description, title, showDescription, isLoading }) => {
  return (
    <div class={`description ${isLoading || showDescription ? 'show' : ''}`}>
      <div class="description-text">
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
    </div>
  )
}

export default Description
