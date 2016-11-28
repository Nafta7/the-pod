import { h } from 'preact'

import Nav from '../components/Nav'
import Loading from '../components/Loading'

import displayDate from '../helpers/display-date'

const Wrapper = (props) => {
  let textClass = ''
  if (!props.showInfo)
    textClass = 'hidden'

  if (props.isLoading) {
    return (
      <Loading />
    )
  } else {
    if (props.isFailure) {
      return (
        <div class="loading">
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
              onRandomClick={props.onRandomClick} />

          <div class="wrapper" style={{backgroundImage: `url(${props.image_hd})`}}>
            <div class={`container ${textClass}`}>
              <div class="text">
                <h1>{props.title}</h1>
                <p>
                  {props.explanation}
                </p>
                <p>
                  {displayDate(props.date)}
                </p>
              </div>
            </div>
          </div>
        </div>
      )
    }
  }
}

export default Wrapper
