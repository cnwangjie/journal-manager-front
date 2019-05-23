import { createBrowserHistory } from 'history'
import { RouterStore, syncHistoryWithStore } from 'mobx-react-router'

const browserHistory = createBrowserHistory()
const route = new RouterStore()
route.history = syncHistoryWithStore(browserHistory, route)

export default route
