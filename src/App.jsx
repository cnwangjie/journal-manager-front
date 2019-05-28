import React, { Component } from 'react'
import { observer } from 'mobx-react'
import { Layout, Menu } from 'antd'
import { Route, Switch, Link } from 'react-router-dom'
import stores from './stores'

import './App.css'
import bg from './assets/bg.jpg'

import Home from './pages/Home'
import Container from './pages/Container'

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
          <Link to='/'><div className='site-name'>Journal Manager</div></Link>
          <Menu
            theme='dark'
            mode='horizontal'
            onClick={this.navTo}
            selectedKeys={[stores.route.location.pathname]}
            style={{ lineHeight: '64px' }}
          >
            <Menu.Item key='/journal'>期刊</Menu.Item>
            <Menu.Item key='/inventory'>库存</Menu.Item>
            <Menu.Item key='/paper'>论文</Menu.Item>
            <Menu.Item key='/subscription'>订阅</Menu.Item>
          </Menu>
        </Header>
        <Content style={{
          padding: '50px',
          backgroundImage: `url(${bg})`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          backgroundSize: 'cover'
        }}>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route component={Container} />
          </Switch>
        </Content>
      </Layout>
    )
  }
}

export default App
