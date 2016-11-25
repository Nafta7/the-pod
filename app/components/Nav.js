import { h } from 'preact'

const Nav = (props) => {
  return (
    <nav class="nav">
      <ul class="menu">
        <li>
          <button type="submit" class="btn"
                  onClick={props.onPreviousClick}>
            Previous
          </button>
        </li>
        <li>
          <button type="submit" class="btn"
            onClick={props.onRandomClick}>
            Random</button>
        </li>
      </ul>
    </nav>
  )
}

export default Nav
