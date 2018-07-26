import { h } from 'preact'
import PreactCSSTransitionGroup from 'preact-css-transition-group'

import Loading from './LoadingSpinner'
import Failure from './Failure'
import App from './App'

const AppWrapper = ({
  isAsync,
  isFailure,
  isLoadingImage,
  tries,
  children
}) => {
  let component, mainComponent

  if (isFailure) {
    component = <Failure key="failure-key" tries={tries} />
  }

  const appComponent = (
    <App key="app-key">{!component ? children : component}</App>
  )

  if (isAsync) {
    mainComponent = appComponent
    return mainComponent
  } else {
    if (isLoadingImage) {
      component = <Loading key="loading-key" />
    }
    if (!component) {
      component = appComponent
    }

    const transitionComponent = (
      <PreactCSSTransitionGroup
        transitionName="fade"
        transitionEnterTimeout={1000}
        transitionLeaveTimeout={500}
      >
        {component}
      </PreactCSSTransitionGroup>
    )

    mainComponent = transitionComponent
  }
  return mainComponent
}

export default AppWrapper
