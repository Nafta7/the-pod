import { h } from 'preact'
import InfoIcon from '../icons/InfoIcon'
import DescriptionIcon from '../icons/DescriptionIcon'

function Footer({
  title,
  date,
  showTitle,
  showInfo,
  onTitleClick,
  onToggleClick
}) {
  const footerVisibility = showTitle ? 'show' : ''

  let toggleButtonClasses = ['btn']
  if (showInfo) toggleButtonClasses.push('active')

  return (
    <footer class="footer-container">
      <div class="footer-icon">
        <a class="btn" onClick={onTitleClick}>
          <InfoIcon />
        </a>
      </div>
      <div class={`footer ${footerVisibility}`}>
        <div class="footer-inner">
          <span class="footer-title">{title}</span>
        </div>
      </div>
      <div class="footer-icon">
        <a class={toggleButtonClasses.join(' ')} onClick={onToggleClick}>
          <DescriptionIcon />
          <span class="btn-text">Details</span>
        </a>
      </div>
    </footer>
  )
}

export default Footer
