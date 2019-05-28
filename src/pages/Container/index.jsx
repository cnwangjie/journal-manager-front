import React, { Component } from 'react'
import { observer } from 'mobx-react'
import { Route, Switch } from 'react-router-dom'

import Journal from '../Journal'
import JournalEdit from '../JournalEdit'
import JournalDetail from '../JournalDetail'
import Inventory from '../Inventory'
import Paper from '../Paper'
import PaperEdit from '../PaperEdit'
import Subscription from '../Subscription'

@observer
class Container extends Component {
  render () {
    return (
      <div style={{ padding: '50px', background: 'white', borderRadius: 5 }}>
        <Switch>
          <Route path='/journal/edit' component={JournalEdit} />
          <Route path='/journal/:id' component={JournalDetail} />
          <Route path='/journal' component={Journal} />
          <Route path='/inventory' component={Inventory} />
          <Route path='/paper/edit' component={PaperEdit} />
          <Route path='/paper' component={Paper} />
          <Route path='/subscription' component={Subscription} />
        </Switch>
      </div>
    )
  }
}

export default Container
