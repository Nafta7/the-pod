import { h } from 'preact'

const Failure = props => {
  return (
    <div class="container">
      <h1 class="title">
        Request failed {props.tries + 1} times. <br/>
        Try again later.
      </h1>
    </div>
  )
}

export default Failure
