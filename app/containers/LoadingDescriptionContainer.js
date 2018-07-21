import { h, Component } from 'preact'
import Loading from '../components/LoadingDescription'

class LoadingDescriptionContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      description: props.description,
      title: props.title
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      description: nextProps.description,
      title: nextProps.title
    })
  }

  render() {
    return (
      <Loading title={this.state.title} description={this.state.description} />
    )
  }
}

export default LoadingDescriptionContainer
