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

import Nav from '../components/Nav'
import Loading from '../components/Loading'

import yesterday from '../helpers/yesterday'
import normalizeDate from '../helpers/normalize-date'
import randomDate from '../helpers/random-date'
import displayDate from '../helpers/display-date'

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      isLoading: true,
      tries: 0,
      isFailure: false
    }

    this.handlePreviousClick = this.handlePreviousClick.bind(this)
    this.handleRandomClick = this.handleRandomClick.bind(this)
    this.receive = this.receive.bind(this)
  }

  receive(data){
    let date = normalizeDate(new Date(data.date))
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

  handlePreviousClick(){
    this.setState({
      isLoading: true
    }, this.makeRequest(yesterday(this.state.date)))

  }

  handleRandomClick(){
    this.setState({
      isLoading: true
    }, this.makeRequest(randomDate(this.state.date)))
  }

  render() {
    if (this.state.isLoading) {
      return (
        <Loading />
      )
    } else {
      if (this.state.isFailure) {
        return (
          <h1>Request failed {this.state.tries + 1} times. Try again later. </h1>
        )
      } else {
        return (
          <div>
            <Nav onPreviousClick={this.handlePreviousClick}
                 onRandomClick={this.handleRandomClick} />

            <div class="image-container">
              <div class="center">
                <img src={`${this.state.image_hd}`} class="image" />
              </div>

              <div>
                <h1>{this.state.title}</h1>
                <p>
                  {this.state.explanation}
                </p>
                <p>
                  {displayDate(this.state.date)}
                </p>
              </div>
            </div>

          </div>
        )
      }
    }
  }

  componentWillMount(){
    let today = normalizeDate(Constants.INITIAL_DAY)
    this.makeRequest(today)
  }
}

export default App
