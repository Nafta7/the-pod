import { h } from 'preact'

import Loading from './Loading'
import Failure from './Failure'
import Nav from './Nav'
import ImageWrapper from './ImageWrapper'
import Info from './Info'
import Overlay from './Overlay'

const App = (props) => {

  if (props.isLoading) {
    return (
      <Loading
      />
    )
  } else {

    if (props.isFailure) {
      return (
        <Failure
          tries={props.tries}
        />
      )
    } else {
      return (
        <div>

          <Nav
            date={props.date}
            onPreviousClick={props.onPreviousClick}
            onNextClick={props.onNextClick}
            onToggleClick={props.onToggleClick}
            onHomeClick={props.onHomeClick}
            onRandomClick={props.onRandomClick}
          />

          <ImageWrapper
            imageUrl={props.image_hd}
            onImageClick={props.onImageClick}
          />

          <Info
            showInfo={props.showInfo}
            date={props.date}
            title={props.title}
            explanation={props.explanation}
           />

          <Overlay
            showOverlay={props.showOverlay}
            imageUrl={props.image_hd}
            onOverlayClick={props.onOverlayClick}
          />

        </div>
      )
    }
  }
}

export default App
