import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'mobx-react'
import { Router } from 'react-router'
import './index.css'
import App from './App'
import stores from './stores'

ReactDOM.render(
  <Provider {...stores}>
    <Router history={stores.route.history}>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root')
)

window.stores = stores
