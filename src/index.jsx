import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'mobx-react'
import { Router } from 'react-router'
import { ConfigProvider } from 'antd'
import './index.css'
import App from './App'
import stores from './stores'

const config = {
  autoInsertSpaceInButton: false
}

ReactDOM.render(
  <Provider {...stores}>
    <Router history={stores.route.history}>
      <ConfigProvider {...config}>
        <App />
      </ConfigProvider>
    </Router>
  </Provider>,
  document.getElementById('root')
)

window.stores = stores
