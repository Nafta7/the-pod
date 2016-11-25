import { h, Component } from 'preact';
import AppConstants from '../constants/AppConstants'
import Constants from '../constants/Constants'
const config = require('../../appconfig')

let getLatest, getByDate
if (config.mode === AppConstants.DEV_MODE) {
  getLatest = require('../../test/helpers/api_fixture').getLatest
  getByDate = require('../../test/helpers/api_fixture').getByDate
} else {
  getLatest = require('../helpers/api').getLatest
  getByDate = require('../helpers/api').getByDate
}

import Wrapper from '../components/Wrapper'

import yesterday from '../helpers/yesterday'
import tomorrow from '../helpers/tomorrow'
import normalizeDate from '../helpers/normalize-date'
import randomDate from '../helpers/random-date'

const downloadImage = new Image()

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      isLoading: true,
      tries: 0,
      isFailure: false,
      showInfo: true
    }

    this.handlePreviousClick = this.handlePreviousClick.bind(this)
    this.handleNextClick = this.handleNextClick.bind(this)
    this.handleToggleClick = this.handleToggleClick.bind(this)
    this.handleRandomClick = this.handleRandomClick.bind(this)
    this.receive = this.receive.bind(this)
  }

  receive(data){
    let date = normalizeDate(new Date(data.date))
    
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

  makeRequest(date){
    getByDate(date)
    .then(this.receive)
    .catch(err => {
      if (this.state.tries >= Constants.MAX_TRY)  {
        this.setState({
          isFailure: true,
          isLoading: false
        })
      } else {
        this.setState({
          tries: this.state.tries + 1
        }, this.makeRequest(yesterday(date)))
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
    }, this.makeRequest(yesterday(this.state.date)))
  }

  handleNextClick(){
    this.setState({
      isLoading: true
    }, this.makeRequest(tomorrow(this.state.date)))
  }

  handleRandomClick(){
    this.setState({
      isLoading: true
    }, this.makeRequest(randomDate(this.state.date)))
  }

  render() {
    return (
      <Wrapper
        isLoading={this.state.isLoading}
        isFailure={this.state.isFailure}
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
    let today = normalizeDate(Constants.LATEST_DAY)
    this.makeRequest(today)
  }
}

export default App
