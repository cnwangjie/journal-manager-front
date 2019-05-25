import React, { Component } from 'react'
import { observer } from 'mobx-react'
import { Layout, Menu } from 'antd'
import { Route } from 'react-router-dom'
import './App.css'
import stores from './stores'

import Journal from './pages/Journal'
import Paper from './pages/Paper'
import Subscription from './pages/Subscription'

const { Header, Content } = Layout

@observer
class App extends Component {
  navTo = ({ key }) => {
    stores.route.push(key)
  }

  render () {
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Header>
          <div className='site-name'>Journal Manager</div>
          <Menu
            theme='dark'
            mode='horizontal'
            onClick={this.navTo}
            selectedKeys={[stores.route.location.pathname]}
            style={{ lineHeight: '64px' }}
          >
            <Menu.Item key='/journal'>期刊列表</Menu.Item>
            <Menu.Item key='/paper'>论文列表</Menu.Item>
            <Menu.Item key='/subscription'>订阅列表</Menu.Item>
          </Menu>
        </Header>
        <Content style={{ padding: '50px', minWidth: 980, margin: '0 auto' }}>
          <div style={{ padding: '50px', background: 'white' }}>
            <Route path='/journal' component={Journal} />
            <Route path='/paper' component={Paper} />
            <Route path='/subscription' component={Subscription} />
          </div>
        </Content>
      </Layout>
    )
  }
}

export default App
