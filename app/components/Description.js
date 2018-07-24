import { h } from 'preact'

const Description = ({
  description,
  title,
  showDescription,
  isLoadingImage,
  isLoadingData
}) => {
  const containerVisibility = isLoadingData ? '' : 'show'
  const contentVisibility = isLoadingData
    ? ''
    : isLoadingImage || showDescription
      ? 'show'
      : ''
  return (
    <div class={`description-container ${containerVisibility}`}>
      <div class={`description ${contentVisibility}`}>
        <div class="description-text">
          <h2>{title}</h2>
          <p>{description}</p>
        </div>
      </div>
    </div>
  )
}

export default Description
