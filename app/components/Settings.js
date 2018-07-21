import { h } from 'preact'
import SettingType from '../constants/SettingType'

const Settings = props => {
  const settingsStyles = ['settings-menu']
  if (props.active) settingsStyles.push('show')
  return (
    <div class={settingsStyles.join(' ')}>
      <div class="settings-item">
        <label for="async" disabled title="Download the images asynchronously">
          Async
        </label>
        <input
          id="async"
          name="async"
          type="checkbox"
          disabled="true"
          title="Download the images asynchronously"
          onChange={e =>
            props.setSetting(SettingType.IS_ASYNC, e.target.checked)
          }
          checked={props.settings.isAsync}
        />
      </div>

      <div class="settings-item">
        <label for="hd" title="Use high quality assets">
          HD
        </label>
        <input
          id="hd"
          name="hd"
          type="checkbox"
          title="Use high quality assets"
          onChange={e => props.setSetting(SettingType.IS_HD, e.target.checked)}
          checked={props.settings.isHd}
        />
      </div>

      <a href="#" class="settings-item">
        About
      </a>
      <a
        class="settings-item"
        href="https://github.com/nefla/the-pod"
        target="_blank"
      >
        Github
      </a>
    </div>
  )
}

export default Settings
