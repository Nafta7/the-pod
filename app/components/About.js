import { h } from 'preact'

function About() {
  return (
    <div class="about-container">
      <div class="about" id="about">
        <h2>About</h2>
        <p class="text">Re-imagining the APOD for modern times.</p>

        <h3>Credits</h3>
        <ul class="about-credits-list text">
          <li>
            Material Icons by{' '}
            <a
              href="https://github.com/google/material-design-icons/"
              target="_blank"
            >
              Google
            </a>
          </li>
          <li>
            APOD API by{' '}
            <a href="https://api.nasa.gov/api.html#apod" target="_blank">
              NASA
            </a>
          </li>
        </ul>

        <h3>License</h3>
        <p class="text">
          The Pod is open-source and is distributed under the terms of the BSD-2
          license. Read more on{' '}
          <a href="https://github.com/nefla/the-pod" target="_blank">
            Github
          </a>.
        </p>
      </div>
    </div>
  )
}

export default About
