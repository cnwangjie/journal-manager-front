import { configure } from 'mobx'

import route from './router'
import data from './data'

configure({ enforceActions: 'always' })

export default {
  route,
  data
}
