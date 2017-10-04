import { h, Component } from 'preact'
import PreactCSSTransitionGroup from 'preact-css-transition-group'

import AppConstants from '../constants/AppConstants'
import ActionType from '../constants/ActionType'
import DaySort from '../constants/DaySort'
import Settings from '../constants/Settings'

import App from '../components/App'
import ImageWrapper from '../components/ImageWrapper'
import Info from '../components/Info'
import Nav from '../components/Nav'
import Overlay from '../components/Overlay'
import Footer from '../components/Footer'

import LoadingContainer from './LoadingContainer'
import Failure from '../components/Failure'

import disableHoverEffectsOnMobile from '../helpers/disable-hover-effects-on-mobile'
import getByDate from '../helpers/get-by-date-bridge'
import shuffleDate from '../helpers/shuffle-date'
import tomorrow from '../helpers/tomorrow'
import yesterday from '../helpers/yesterday'
import isDateSafe from '../helpers/is-date-safe'

const downloadImage = new Image()

class AppContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showInfo: false,
      showOverlay: false,
      tries: 0,
      isFailure: false,
      isLoading: true
    }

    this.handlePreviousClick = this.handlePreviousClick.bind(this)
    this.handleNextClick = this.handleNextClick.bind(this)
    this.handleToggleClick = this.handleToggleClick.bind(this)
    this.handleShuffleClick = this.handleShuffleClick.bind(this)
    this.handleHomeClick = this.handleHomeClick.bind(this)
    this.handleImageClick = this.handleImageClick.bind(this)
    this.handleOverlayClick = this.handleOverlayClick.bind(this)
  }

  makeRequest(currentDate, type) {
    let date

    switch (type) {
      case ActionType.NEWEST:
        date = currentDate
        type = ActionType.LATEST
        DaySort.LATEST = date
        break
      case ActionType.LATEST:
        date = yesterday(currentDate)
        DaySort.LATEST = date
        break
      case ActionType.PREVIOUS:
        date = yesterday(currentDate)
        break
      case ActionType.NEXT:
        date = tomorrow(currentDate)
        break
      case ActionType.SHUFFLE:
        date = shuffleDate()
        break
    }

    this.setState(
      {
        showInfo: false
      },
      () => {
        getByDate(date)
          .then(this.receive.bind(this, date))
          .catch(err => this.handleRejection.bind(this, err, date, type)())
      }
    )
  }

  receive(date, data) {
    let imageUrl

    if (isDateSafe(date)) imageUrl = data.hdurl
    else imageUrl = data.url

    const update = () => {
      this.setState({
        imageUrl: imageUrl,
        title: data.title,
        explanation: data.explanation,
        date: date,
        tries: 0,
        isFailure: false,
        isLoading: false
      })
    }

    if (Settings.IMAGE_SYNC) {
      downloadImage.onload = update
      downloadImage.src = imageUrl
    } else {
      update()
    }
  }

  handleRejection(err, date, type) {
    if (this.state.tries >= AppConstants.MAX_TRY) {
      this.setState({
        isFailure: true,
        isLoading: false
      })
    } else {
      this.setState(
        {
          tries: this.state.tries + 1
        },
        this.makeRequest(date, type)
      )
    }
  }

  handleHomeClick() {
    this.setState(
      {
        isLoading: true
      },
      this.makeRequest(DaySort.NEWEST, ActionType.NEWEST)
    )
  }

  handlePreviousClick() {
    this.setState(
      {
        isLoading: true
      },
      this.makeRequest(this.state.date, ActionType.PREVIOUS)
    )
  }

  handleShuffleClick() {
    this.setState(
      {
        isLoading: true
      },
      this.makeRequest(this.state.date, ActionType.SHUFFLE)
    )
  }

  handleNextClick() {
    this.setState(
      {
        isLoading: true
      },
      this.makeRequest(this.state.date, ActionType.NEXT)
    )
  }

  handleToggleClick() {
    this.setState({
      showInfo: !this.state.showInfo
    })
  }

  handleImageClick(e) {
    e.preventDefault()

    this.setState({
      showOverlay: true
    })
  }

  handleOverlayClick(e) {
    if (e.target.id === 'frame-image') return

    this.setState({
      showOverlay: false
    })
  }

  render() {
    let component
    if (this.state.isLoading) {
      component = <LoadingContainer key="loading-key" />
    }
    if (this.state.isFailure) {
      component = <Failure key="failure-key" tries={this.state.tries} />
    }

    if (!component) {
      component = (
        <App key="app-key">
          <Nav
            date={this.state.date}
            showInfo={this.state.showInfo}
            onHomeClick={this.handleHomeClick}
            onPreviousClick={this.handlePreviousClick}
            onShuffleClick={this.handleShuffleClick}
            onNextClick={this.handleNextClick}
            onToggleClick={this.handleToggleClick}
          />

          <ImageWrapper
            imageUrl={this.state.imageUrl}
            onImageClick={this.handleImageClick}
          />

          <Info
            showInfo={this.state.showInfo}
            explanation={this.state.explanation}
          />

          <Footer
            showInfo={this.state.showInfo}
            date={this.state.date}
            title={this.state.title}
          />

          <Overlay
            imageUrl={this.state.imageUrl}
            showOverlay={this.state.showOverlay}
            onOverlayClick={this.handleOverlayClick}
          />
        </App>
      )
    }

    return (
      <div>
        <PreactCSSTransitionGroup
          transitionName="fade"
          transitionEnterTimeout={1000}
          transitionLeaveTimeout={500}
        >
          {component}
        </PreactCSSTransitionGroup>
      </div>
    )
  }

  componentWillMount() {
    disableHoverEffectsOnMobile(window)

    this.makeRequest(DaySort.NEWEST, ActionType.NEWEST)
  }
}

export default AppContainer
