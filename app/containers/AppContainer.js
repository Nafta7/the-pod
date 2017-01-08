import { h, Component } from 'preact';
import AppConstants from '../constants/AppConstants'
import Settings from '../constants/Settings'
import DaySort from '../constants/DaySort'
import ActionType from '../constants/ActionType'
const config = require('../../appconfig')
let getByDate
if (config.mode === AppConstants.DEV_MODE) {
  getByDate = require('../../test/helpers/api_fixture')
} else {
  getByDate = require('../helpers/api')
}

import App from '../components/App'
import Nav from '../components/Nav'
import ImageWrapper from '../components/ImageWrapper'
import Info from '../components/Info'
import Overlay from '../components/Overlay'

import yesterday from '../helpers/yesterday'
import tomorrow from '../helpers/tomorrow'
import shuffleDate from '../helpers/shuffle-date'
import disableHoverEffectsOnMobile from '../helpers/disable-hover-effects-on-mobile'

const downloadImage = new Image()

class AppContainer extends Component {
  constructor(props){
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

  makeRequest(currentDate, type){
    let date

    switch(type) {
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

    getByDate(date)
      .then(this.receive.bind(this, date))
      .catch(err => this.handleRejection.bind(this, err, date, type)())
  }

  receive(date, data){
    const update = () => {
      this.setState({
        image: data.url,
        image_hd: data.hdurl,
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
      downloadImage.src = data.hdurl
    } else {
      update()
    }
  }

  handleRejection(err, date, type){
    if (this.state.tries >= AppConstants.MAX_TRY)  {
      this.setState({
        isFailure: true,
        isLoading: false
      })
    } else {
      this.setState({
        tries: this.state.tries + 1
      }, this.makeRequest(date, type))
    }
  }

  handleHomeClick(){
    this.setState({
      isLoading: true
    }, this.makeRequest(DaySort.NEWEST, ActionType.NEWEST))
  }

  handlePreviousClick(){
    this.setState({
      isLoading: true
    }, this.makeRequest(this.state.date, ActionType.PREVIOUS))
  }

  handleShuffleClick(){
    this.setState({
      isLoading: true
    }, this.makeRequest(this.state.date, ActionType.SHUFFLE))
  }

  handleNextClick(){
    this.setState({
      isLoading: true
    }, this.makeRequest(this.state.date, ActionType.NEXT))
  }

  handleToggleClick(){
    this.setState({
      showInfo: !this.state.showInfo
    })
  }

  handleImageClick(e){
    e.preventDefault()

    this.setState({
      showOverlay: true
    })
  }

  handleOverlayClick(e){
    if (e.target.id === 'frame-image') return

    this.setState({
      showOverlay: false
    })
  }

  render() {
    return (
      <App
        tries={this.state.tries}
        isFailure={this.state.isFailure}
        isLoading={this.state.isLoading}
      >

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
          imageUrl={this.state.image_hd}
          onImageClick={this.handleImageClick}
        />
        <Info
          showInfo={this.state.showInfo}
          date={this.state.date}
          title={this.state.title}
          explanation={this.state.explanation}
        />

        <Overlay
          imageUrl={this.state.image_hd}
          showOverlay={this.state.showOverlay}
          onOverlayClick={this.handleOverlayClick}
        />

      </App>
    )
  }

  componentWillMount(){
  disableHoverEffectsOnMobile(window)

  this.makeRequest(DaySort.NEWEST, ActionType.NEWEST)
  }
}

export default AppContainer
