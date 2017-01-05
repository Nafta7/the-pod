import { h } from 'preact'

const ImageWrapper = props => {
  return (
    <a href={props.imageUrl} onClick={props.onImageClick}>
      <div class="wrapper" style={{backgroundImage: `url(${props.imageUrl})`}}>
      </div>
    </a>
  )
}

export default ImageWrapper
