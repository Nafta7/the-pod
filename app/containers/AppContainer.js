import { h, Component } from 'preact'
const config = require('../../appconfig')

import AppConstants from '../constants/AppConstants'
import ActionType from '../constants/ActionType'
import DaySort from '../constants/DaySort'
import SettingType from '../constants/SettingType'

import AppWrapper from '../components/AppWrapper'
import Nav from '../components/Nav'
import ImageWrapper from '../components/ImageWrapper'
import ImageOverlay from '../components/ImageOverlay'
import Overlay from '../components/Overlay'
import Description from '../components/Description'
import About from '../components/About'
import Footer from '../components/Footer'

import disableHoverEffectsOnMobile from '../helpers/disable-hover-effects-on-mobile'
import getByDate from '../helpers/get-by-date-bridge'
import shuffleDate from '../helpers/shuffle-date'
import tomorrow from '../helpers/tomorrow'
import yesterday from '../helpers/yesterday'
import isDateSafe from '../helpers/is-date-safe'
import updateImageWrapper from '../helpers/update-image-wrapper'

const downloadImage = new Image()

const defaultSettings = {
  isAsync: false,
  isHd: false
}

class AppContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showOverlay: false,
      showAbout: false,
      showImageOverlay: false,
      showSettings: false,
      showDescription: false,
      showTitle: true,
      settings: defaultSettings,
      tries: 0,
      isFailure: false,
      isLoadingData: true,
      isLoadingImage: true
    }

    this.setSetting = this.setSetting.bind(this)
    this.handleActionClick = this.handleActionClick.bind(this)
    this.handleDescriptionClick = this.handleDescriptionClick.bind(this)
    this.handleTitleClick = this.handleTitleClick.bind(this)
    this.handleImageClick = this.handleImageClick.bind(this)
    this.handleOverlayClick = this.handleOverlayClick.bind(this)
    this.handleSettingsClick = this.handleSettingsClick.bind(this)
    this.handleAboutClick = this.handleAboutClick.bind(this)
    this.loadImage = this.loadImage.bind(this)
    this.updateImage =
      config.mode === AppConstants.DEV_MODE
        ? updateImageWrapper.bind(this, this.updateImage)
        : this.updateImage.bind(this)
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

    this.setState({}, () => {
      getByDate(date)
        .then(this.receive.bind(this, date))
        .catch(err => this.handleRejection.bind(this, err, date, type)())
    })
  }

  receive(date, data) {
    this.setState(
      {
        title: data.title,
        explanation: data.explanation,
        date: date,
        url: data.url,
        hdurl: data.hdurl,
        tries: 0,
        isFailure: false,
        isLoadingData: false
      },
      this.loadImage
    )
  }

  loadImage() {
    this.setState(
      {
        isLoadingImage: true
      },
      () => {
        let imageUrl = this.state.settings.isHd
          ? this.state.hdurl
          : this.state.url
        if (this.state.settings.isHd) {
          imageUrl = isDateSafe(this.state.date)
            ? (imageUrl = this.state.hdurl)
            : (imageUrl = this.state.url)
        }

        if (this.state.settings.isAsync) {
          this.updateImage(imageUrl)
        } else {
          downloadImage.onload = this.updateImage.bind(this, imageUrl)
          downloadImage.src = imageUrl
        }
      }
    )
  }

  updateImage(imageUrl) {
    this.setState({
      imageUrl: imageUrl,
      isLoadingImage: false
    })
  }

  handleRejection(err, date, type) {
    if (this.state.tries >= AppConstants.MAX_TRY) {
      this.setState({
        date,
        isFailure: true,
        isLoadingData: false,
        isLoadingImage: false
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

  handleActionClick(actionType) {
    const date =
      actionType === ActionType.NEWEST ? DaySort.NEWEST : this.state.date
    this.setState(
      {
        isLoadingData: true,
        isLoadingImage: true,
        showSettings: false,
        imageUrl: ''
      },
      this.makeRequest(date, actionType)
    )
  }

  handleDescriptionClick() {
    this.setState({
      showDescription: !this.state.showDescription
    })
  }

  handleTitleClick() {
    this.setState({
      showTitle: !this.state.showTitle
    })
  }

  handleSettingsClick(e) {
    this.setState({
      showSettings: !this.state.showSettings
    })
  }

  handleAboutClick(e) {
    this.setState({
      showAbout: !this.state.showAbout
    })
  }

  handleImageClick(e) {
    e.preventDefault()

    this.setState({
      showImageOverlay: true
    })
  }

  handleOverlayClick(property, e) {
    const currentOverlay = property.replace('show', '').toLowerCase()
    if (e.target.closest(`#${currentOverlay}`)) return

    this.setState({
      [property]: false,
      showSettings: false
    })
  }

  render() {
    return (
      <div>
        <Nav
          date={this.state.date}
          settings={this.state.settings}
          showSettings={this.state.showSettings}
          onActionClick={this.handleActionClick}
          onSettingsClick={this.handleSettingsClick}
          onAboutClick={this.handleAboutClick}
          setSetting={this.setSetting}
        />

        <Description
          showDescription={this.state.showDescription}
          isLoadingData={this.state.isLoadingData}
          isLoadingImage={this.state.isLoadingImage}
          description={this.state.explanation}
          title={this.state.title}
        />

        <AppWrapper
          isAsync={this.state.settings.isAsync}
          isFailure={this.state.isFailure}
          isLoadingImage={this.state.isLoadingImage}
          tries={this.state.tries}
        >
          <ImageWrapper
            imageUrl={this.state.imageUrl}
            onImageClick={this.handleImageClick}
          />

          <Overlay
            showOverlay={this.state.showImageOverlay}
            onOverlayClick={this.handleOverlayClick.bind(
              null,
              'showImageOverlay'
            )}
          >
            <ImageOverlay imageUrl={this.state.imageUrl} />
          </Overlay>

          <Overlay
            showOverlay={this.state.showAbout}
            onOverlayClick={this.handleOverlayClick.bind(null, 'showAbout')}
          >
            <About />
          </Overlay>
        </AppWrapper>

        <Footer
          date={this.state.date}
          title={this.state.title}
          showTitle={this.state.showTitle}
          showDescription={this.state.showDescription}
          onTitleClick={this.handleTitleClick}
          onDescriptionClick={this.handleDescriptionClick}
        />
      </div>
    )
  }

  setSetting(settingType, value) {
    localStorage.setItem(settingType.toString(), value)
    const newSettings = this.state.settings
    newSettings[settingType] = value

    this.setState(
      {
        settings: newSettings
      },
      () => {
        if (!this.state.isLoadingData) this.loadImage()
      }
    )
  }

  loadSettings() {
    const isAsync =
      localStorage.getItem(SettingType.IS_ASYNC.toString()) !== null
        ? JSON.parse(localStorage.getItem(SettingType.IS_ASYNC.toString()))
        : defaultSettings.isAsync
    const isHd =
      localStorage.getItem(SettingType.IS_HD.toString()) !== null
        ? JSON.parse(localStorage.getItem(SettingType.IS_HD.toString()))
        : defaultSettings.isHd

    const newSettings = {
      isAsync,
      isHd
    }

    this.setState({
      settings: newSettings
    })
  }

  componentWillMount() {
    this.loadSettings()
    disableHoverEffectsOnMobile(window)
    this.makeRequest(DaySort.NEWEST, ActionType.NEWEST)
  }
}

export default AppContainer
