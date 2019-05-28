import React, { Component } from 'react'
import { Row, Col, Typography } from 'antd'
import './index.css'

const { Title } = Typography

class Home extends Component {
  render () {
    return (
      <Row style={{ height: 'calc(100vh - 164px)' }} type='flex' align='middle'>
        <Col offset={4} className='blur-block'>
          <div className='blur-cover' />
          <div className='blur-content'>
            <Title style={{ fontSize: 78, textShadow: '3px 3px 6px white' }}>期刊管理系统</Title>
          </div>
        </Col>
      </Row>
    )
  }
}

export default Home
