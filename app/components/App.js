import { h, Component } from 'preact';
const getLatest = require('../helpers/api').getLatest
const fixture = require('../../test/fixture-data')

class App extends Component {
  render() {
    return (
      <div>
        <h1>{this.state.title}</h1>
        <img src={`${this.state.image_hd}`} class="fit" />
      </div>
    )
  }

  componentWillMount(){
    // this.makeRequest()
    this.setState({
      image: fixture.url,
      image_hd: fixture.hdurl,
      title: fixture.title
    })
  }

  makeRequest(){
    getLatest().then(data => {
      this.setState({
        image: data.url,
        image_hd: data.hdurl,
        title: data.title
      })
    })
  }
}

export default App
