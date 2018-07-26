import { h } from 'preact'

const Overlay = ({ showOverlay, onOverlayClick, children }) => {
  return (
    <div
      class={`overlay ${showOverlay ? 'show' : ''}`}
      onClick={onOverlayClick}
    >
      {children}
    </div>
  )
}

export default Overlay
