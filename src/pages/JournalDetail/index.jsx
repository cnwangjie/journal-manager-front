import React, { Component } from 'react'
import { PageHeader, Row, Col, Statistic } from 'antd'
import stores from '../../stores'
import { getJournal, getInventoriesByJournalId, getSubscriptionsByJournalId } from '../../service'

import InventoryList from '../../components/InventoryList'

class JournalDetail extends Component {
  state = {
    loading: true,
    _id: '',
    name: '',
    inventories: [],
    subscriptions: []
  }

  async componentDidMount () {
    const id = this.props.match.params.id
    const [
      { data: journal },
      { data: inventories },
      { data: subscriptions }
    ] = await Promise.all([
      getJournal(id),
      getInventoriesByJournalId(id),
      getSubscriptionsByJournalId(id)
    ])
    this.setState({ ...journal, inventories, subscriptions, loading: false })
  }

  render () {
    const { length: subscribYears } = this.state.subscriptions
    const { length: inventoriesSum } = this.state.inventories

    return (
      <div>
        <PageHeader
          title={this.state.name}
        >
          <Row>
            <Col span={12}>
              <Statistic title='订阅的年份' value={subscribYears} />
            </Col>
            <Col span={12}>
              <Statistic title='库存总数' value={inventoriesSum} />
            </Col>
          </Row>
        </PageHeader>
        <InventoryList loading={this.state.loading} data={this.state.inventories} name={this.state.name} />
      </div>
    )
  }
}

export default JournalDetail
