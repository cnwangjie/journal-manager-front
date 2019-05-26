import { observer } from 'mobx-react'
import React, { Component } from 'react'
import { Table, Typography, Button, Row, Col, Divider } from 'antd'
import store from '../../stores'

import AddModal from './AddModal'
import StockModal from './StockModal'

const { Title } = Typography

const columnsMap = {
  name: '期刊名称',
  code: '邮发代号',
  year: '年份'
}

const columns = Object.entries(columnsMap).map(([key, title]) => ({ title, key, dataIndex: key }))

@observer
class Subscription extends Component {
  state = {
    addModalVisible: false,
    stockModalVisible: false,
    stockItem: null
  }

  openAddModal = () => {
    this.setState({
      addModalVisible: true
    })
  }

  closeAddModal = () => {
    this.setState({
      addModalVisible: false
    })
  }

  openStockModal = (subscription) => {
    this.setState({
      stockModalVisible: true,
      stockItem: subscription
    })
  }

  closeStockModal = () => {
    this.setState({
      stockModalVisible: false
    })
  }

  deleteSubscription = (subscription) => {
    store.data.deleteSubscription(subscription._id)
  }

  componentDidMount () {
    store.data.getAllSubscriptions()
  }

  render () {
    const columnsWithAction = columns.slice()

    columnsWithAction.push({
      name: '操作',
      key: 'action',
      width: 160,
      render: (_, record) => {
        return (
          <div>
            <Button size='small' type='link' onClick={() => this.openStockModal(record)}>入库</Button>
            <Divider type='vertical' />
            <Button size='small' type='link' onClick={() => this.deleteSubscription(record)} style={{ color: 'red' }}>删除</Button>
          </div>
        )
      }
    })

    return (
      <div>
        <Row>
          <Col span={8}>
            <Title>订阅列表</Title>
          </Col>
          <Col span={8} offset={8}>
            <Button onClick={this.openAddModal}>增订期刊</Button>
          </Col>
        </Row>

        <Table rowKey='_id' dataSource={store.data.mappedSubscriptions} columns={columnsWithAction} />

        <AddModal
          visible={this.state.addModalVisible}
          onOk={this.closeAddModal}
          onCancel={this.closeAddModal}
        />

        <StockModal
          visible={this.state.stockModalVisible}
          onOk={this.closeStockModal}
          onCancel={this.closeStockModal}
          subscription={this.state.stockItem}
        />
      </div>
    )
  }
}

export default Subscription
