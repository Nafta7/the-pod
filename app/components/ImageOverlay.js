import { h } from 'preact'

const ImageOverlay = ({ imageUrl }) => {
  return (
    <div class="frame" id="frame">
      <a href={imageUrl} onClick={e => e.preventDefault()}>
        <img id="imageoverlay" src={`${imageUrl}`} class="frame-image" />
      </a>
    </div>
  )
}

export default ImageOverlay
