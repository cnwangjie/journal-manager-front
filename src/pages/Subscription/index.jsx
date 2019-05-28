import _ from 'lodash'
import { observer } from 'mobx-react'
import React, { Component } from 'react'
import { Table, Button, Divider, PageHeader, Row, Col, Statistic, message } from 'antd'
import store from '../../stores'

import AddModal from './AddModal'
import StockModal from './StockModal'

const columnsMap = {
  name: '期刊名称',
  code: '邮发代号',
  year: '年份'
}

const columns = Object.entries(columnsMap).map(([key, title]) => ({
  title,
  key,
  dataIndex: key,
  sorter: (a, b) => key === 'year' ? a.year - b.year : a[key] > b[key] ? 1 : -1
}))

@observer
class Subscription extends Component {
  state = {
    loading: true,
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

  deleteSubscription = async (subscription) => {
    await store.data.deleteSubscription(subscription._id)
    message.success('删除成功')
  }

  async componentDidMount () {
    await store.data.getAllSubscriptions()
    this.setState({ loading: false })
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

    const { length: journalSum } = _.uniqBy(store.data.subscriptions, 'journal_id')
    const { length: allSum } = store.data.subscriptions
    const { length: thisYearSum } = store.data.subscriptions.filter(({ year }) => year === new Date().getFullYear())

    return (
      <div>
        <PageHeader
          title='订阅列表'
          extra={[
            <Button key='add' type='primary' onClick={this.openAddModal}>增订期刊</Button>
          ]}
        >
          <Row>
            <Col span={6}>
              <Statistic title='订阅的期刊种类' value={journalSum} />
            </Col>
            <Col span={6}>
              <Statistic title='订阅的期刊总数' value={allSum} />
            </Col>
            <Col span={6}>
              <Statistic title='今年订阅的期刊' value={thisYearSum} />
            </Col>
          </Row>
        </PageHeader>

        <Table rowKey='_id' loading={this.state.loading} dataSource={store.data.mappedSubscriptions} columns={columnsWithAction} />

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
