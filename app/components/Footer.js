import { h } from 'preact'
import TitleIcon from '../icons/TitleIcon'
import DescriptionIcon from '../icons/DescriptionIcon'

function Footer({
  title,
  date,
  showTitle,
  showDescription,
  onTitleClick,
  onDescriptionClick
}) {
  return (
    <footer class="footer-container">
      <div class="footer-icon">
        <a class={`btn ${showTitle ? 'active' : ''}`} onClick={onTitleClick}>
          <TitleIcon />
          <span class="btn-text">Title</span>
        </a>
      </div>
      <div class={`footer ${showTitle ? 'show' : ''}`}>
        <div class="footer-inner">
          <span class="footer-title">{title}</span>
        </div>
      </div>
      <div class="footer-icon">
        <a
          class={`btn ${showDescription ? 'active' : ''}`}
          onClick={onDescriptionClick}
        >
          <DescriptionIcon />
          <span class="btn-text">Details</span>
        </a>
      </div>
    </footer>
  )
}

export default Footer
