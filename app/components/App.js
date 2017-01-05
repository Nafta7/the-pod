import { h } from 'preact'

import Nav from './Nav'
import Loading from './Loading'
import Overlay from './Overlay'

import displayDate from '../helpers/display-date'

const App = (props) => {
  let boxHidden = ''
  if (!props.showInfo)
    boxHidden = 'hidden'

  if (props.isLoading) {
    return (
      <Loading />
    )
  } else {
    if (props.isFailure) {
      return (
        <div class="container">
          <h1 class="title">
            Request failed {props.tries + 1} times. <br/>
            Try again later.
          </h1>
        </div>
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
              onRandomClick={props.onRandomClick} />
          <a href={props.image_hd} onClick={props.onImageClick}>
            <div class="wrapper" style={{backgroundImage: `url(${props.image_hd})`}}>
            </div>
          </a>
          <div class={`box ${boxHidden}`}>
            <h1 class="box-title">
              <span class="box-title-text">
                {props.title}
              </span>
              <span class="box-title-date">
                {displayDate(props.date)}
              </span>
            </h1>
            <p class="box-text">
              {props.explanation}
            </p>

          </div>

          <Overlay
            showOverlay={props.showOverlay}
            imageUrl={props.image_hd}
            onOverlayClick={props.onOverlayClick} />
        </div>
      )
    }
  }
}

export default App
