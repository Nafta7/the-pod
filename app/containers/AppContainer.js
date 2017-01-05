import { h, Component } from 'preact';
import AppConstants from '../constants/AppConstants'
import Constants from '../constants/Constants'
import ActionType from '../constants/ActionType'
const config = require('../../appconfig')

let getByDate
if (config.mode === AppConstants.DEV_MODE) {
  getByDate = require('../../test/helpers/api_fixture')
} else {
  getByDate = require('../helpers/api')
}

import App from '../components/App'

import yesterday from '../helpers/yesterday'
import tomorrow from '../helpers/tomorrow'
import randate from '../helpers/randate'

const downloadImage = new Image()

class AppContainer extends Component {
  constructor(props){
    super(props)
    this.state = {
      isLoading: true,
      tries: 0,
      isFailure: false,
      showInfo: false,
      showOverlay: false
    }

    this.handlePreviousClick = this.handlePreviousClick.bind(this)
    this.handleNextClick = this.handleNextClick.bind(this)
    this.handleToggleClick = this.handleToggleClick.bind(this)
    this.handleRandomClick = this.handleRandomClick.bind(this)
    this.handleHomeClick = this.handleHomeClick.bind(this)
    this.handleImageClick = this.handleImageClick.bind(this)
    this.handleOverlayClick = this.handleOverlayClick.bind(this)
    this.receive = this.receive.bind(this)
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

    if (Constants.WAIT_IMAGE) {
      downloadImage.onload = update
      downloadImage.src = data.hdurl
    } else {
      update()
    }
  }

  makeRequest(currentDate, type){
    let date

    switch(type) {
      case ActionType.PREVIOUS:
         date = yesterday(currentDate)
        break
      case ActionType.NEXT:
        date = tomorrow(currentDate)
        break
      case ActionType.RANDOM:
        date = randate(currentDate)
        break
      case ActionType.NEWEST:
        date = currentDate
        type = ActionType.LATEST
        break
      case ActionType.LATEST:
        date = yesterday(currentDate)
        Constants.LATEST_DAY = date
        break
    }

    getByDate(date)
    .then(this.receive.bind(null, date))
    .catch(err => {
      if (this.state.tries >= Constants.MAX_TRY)  {
        this.setState({
          isFailure: true,
          isLoading: false
        })
      } else {
        this.setState({
          tries: this.state.tries + 1
        }, this.makeRequest(date, type))
      }
    })
  }

  handleToggleClick(){
    this.setState({
      showInfo: !this.state.showInfo
    })
  }

  handlePreviousClick(){
    this.setState({
      isLoading: true
    }, this.makeRequest(this.state.date, ActionType.PREVIOUS))
  }

  handleNextClick(){
    this.setState({
      isLoading: true
    }, this.makeRequest(this.state.date, ActionType.NEXT))
  }

  handleRandomClick(){
    this.setState({
      isLoading: true
    }, this.makeRequest(this.state.date, ActionType.RANDOM))
  }

  handleHomeClick(){
    window.location = 'index.html'
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
        isLoading={this.state.isLoading}
        isFailure={this.state.isFailure}
        tries={this.state.tries}
        onPreviousClick={this.handlePreviousClick}
        onNextClick={this.handleNextClick}
        onRandomClick={this.handleRandomClick}
        onHomeClick={this.handleHomeClick}
        onImageClick={this.handleImageClick}
        onToggleClick={this.handleToggleClick}
        onOverlayClick={this.handleOverlayClick}
        image_hd={this.state.image_hd}
        title={this.state.title}
        explanation={this.state.explanation}
        date={this.state.date}
        showInfo={this.state.showInfo}
        showOverlay={this.state.showOverlay} />
    )
  }

  componentWillMount(){
    // deal with sticky :hover effects on mobile
    // from: http://www.javascriptkit.com/dhtmltutors/sticky-hover-issue-solutions.shtml
    const touchsupport = ('ontouchstart' in window)
      || (navigator.maxTouchPoints > 0)
      || (navigator.msMaxTouchPoints > 0)

    if (!touchsupport){ // browser doesn't support touch
        document.documentElement.classList.add('non-touch')
    }

    this.makeRequest(Constants.LATEST_DAY, ActionType.NEWEST)
  }
}

export default AppContainer
