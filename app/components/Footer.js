import { h } from 'preact'
import displayDate from '../helpers/display-date'

function Footer({ title, date, showInfo }) {
  const footerVisibility = (showInfo) ? 'show' : ''
  
  return (
    <footer class={`footer ${footerVisibility}`}>
      <div class='footer-inner'>
        <span class="footer-title">
          {title}
        </span>
        <span class="footer-date">
          {displayDate(date)}
        </span>
      </div>
    </footer>
  )
}

export default Footer
