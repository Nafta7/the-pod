import { h } from 'preact'
import displayDate from '../helpers/display-date'
import InfoIcon from '../icons/InfoIcon'

function Footer({ title, date, showTitle, onTitleClick }) {
  const footerVisibility = showTitle ? 'show' : ''
  const footerDate = date ? displayDate(date) : ''

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
          <span class="footer-date">{footerDate}</span>
        </div>
      </div>
    </footer>
  )
}

export default Footer
