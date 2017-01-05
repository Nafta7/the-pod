import { h } from 'preact'

const Overlay = (props) => {
  const overlayVisual = ['overlay']
  if (props.showOverlay)
    overlayVisual.push('show')

  return (
    <div class={overlayVisual.join(' ')} onClick={props.onOverlayClick}>
      <div class="frame">
        <a href={props.imageUrl} onClick={(e) => e.preventDefault() }>
          <img id="frame-image" src={`${props.imageUrl}`} class="frame-image" />
        </a>
      </div>
    </div>
  )
}

export default Overlay
