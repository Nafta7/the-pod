import AppConstants from '../constants/AppConstants'

let timer

function updateImageWrapper(cb, imageUrl) {
  clearTimeout(timer)
  timer = setTimeout(cb.bind(this, imageUrl), AppConstants.DEV_IMAGE_DELAY)
}

export default updateImageWrapper
