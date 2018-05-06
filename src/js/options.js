import '../css/options.scss'
import M from 'materialize-css'
import store from './store'
import {
  updateOption,
  fetchOptions
} from './actions'
import {
  request
} from './client'

// Initialize materialize framework's JS.
M.AutoInit()

const fields = ['host', 'port', 'endpoint', 'username', 'password']
const testMsgBox = document.getElementById('test-message')
const onFieldChange = event => {
  event.target.disabled = true
  store
    .dispatch(
      updateOption({
        field: event.target.id,
        value: event.target.value
      })
    )
    .then(() => {
      event.target.disabled = false
    })
}

store.dispatch(fetchOptions()).then(options => {
  fields.forEach(fieldID => {
    const field = document.getElementById(fieldID)
    field.value = options[fieldID]

    // Synchronize options the field value changes.
    field.addEventListener('change', onFieldChange)
  })
})

document.getElementById('test-settings').addEventListener('submit', event => {
  event.preventDefault()
  testMsgBox.classList.add('hide')
  setTimeout(() => {
    request('session-get')
      .then(
        body => {
          testMsgBox.innerHTML = `Connected: Transmission version ${
            body.arguments.version
          }`
        },
        err => {
          testMsgBox.innerHTML = err
        }
      )
      .finally(() => {
        testMsgBox.classList.remove('hide')
      })
  }, 200)
})
