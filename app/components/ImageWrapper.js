import { h } from 'preact'

const ImageWrapper = ({ imageUrl, onImageClick }) => {
  return (
    <a href={imageUrl} onClick={onImageClick}>
      <img src={imageUrl} class="image-wrapper" />
    </a>
  )
}

export default ImageWrapper
