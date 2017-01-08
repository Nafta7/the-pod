import { h } from 'preact'

import Loading from './Loading'
import Failure from './Failure'

const App = props => {
  if (props.isLoading) return <Loading />

  return (
    (props.isFailure)
      ? <Failure tries={props.tries} />
      : <div> {props.children} </div>
  )

}

export default App
