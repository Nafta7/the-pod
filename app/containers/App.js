import { h, Component } from 'preact';
import AppConstants from '../constants/AppConstants'
import Constants from '../constants/Constants'
import ActionType from '../constants/ActionType'
const config = require('../../appconfig')

let getByDate
if (config.mode === AppConstants.DEV_MODE) {
  getByDate = require('../../test/helpers/api_fixture').getByDate
} else {
  getByDate = require('../helpers/api').getByDate
}

import Wrapper from '../components/Wrapper'

import yesterday from '../helpers/yesterday'
import tomorrow from '../helpers/tomorrow'
import randomDate from '../helpers/random-date'

const downloadImage = new Image()

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      isLoading: true,
      tries: 0,
      isFailure: false,
      showInfo: false
    }

    this.handlePreviousClick = this.handlePreviousClick.bind(this)
    this.handleNextClick = this.handleNextClick.bind(this)
    this.handleToggleClick = this.handleToggleClick.bind(this)
    this.handleRandomClick = this.handleRandomClick.bind(this)
    this.receive = this.receive.bind(this)
  }

  receive(date, data){
    downloadImage.onload = () => {
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

    downloadImage.src = data.hdurl
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
        date = randomDate(currentDate)
        break
      default:
        date = currentDate
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

  render() {
    return (
      <Wrapper
        isLoading={this.state.isLoading}
        isFailure={this.state.isFailure}
        tries={this.state.tries}
        onPreviousClick={this.handlePreviousClick}
        onNextClick={this.handleNextClick}
        onRandomClick={this.handleRandomClick}
        onToggleClick={this.handleToggleClick}
        image_hd={this.state.image_hd}
        title={this.state.title}
        explanation={this.state.explanation}
        date={this.state.date}
        showInfo={this.state.showInfo} />
    )
  }

  componentWillMount(){
    this.makeRequest(Constants.LATEST_DAY)
  }
}

export default App
