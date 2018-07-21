import { h } from 'preact'

const LoadingDescription = ({ description, title }) => {
  return (
    <div class="loading-description-container">
      <div class="ring ring-fixed" />
      <div class="loading-description-text">
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
    </div>
  )
}

export default LoadingDescription
