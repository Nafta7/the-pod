// deal with sticky :hover effects on mobile
// from: http://www.javascriptkit.com/dhtmltutors/sticky-hover-issue-solutions.shtml

function disableHoverEffectsOnMobile(window){
  const hasTouchSupport = ('ontouchstart' in window)
    || (window.navigator.maxTouchPoints > 0)
    || (window.navigator.msMaxTouchPoints > 0)

  if (!hasTouchSupport)
    window.document.documentElement.classList.add('non-touch')
}

export default disableHoverEffectsOnMobile
