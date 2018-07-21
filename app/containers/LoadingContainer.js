import { h, Component } from 'preact'
const quotations = require('../../quotes').quotations
import randInt from '../helpers/random-int'
import Loading from '../components/Loading'

class LoadingContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      quotation: null
    }
  }

  componentWillMount(props) {
    const quotation = quotations[randInt(0, quotations.length - 1)]
    this.setState({
      quotation: quotation
    })
  }

  render() {
    return <Loading quotation={this.state.quotation} />
  }
}

export default LoadingContainer
