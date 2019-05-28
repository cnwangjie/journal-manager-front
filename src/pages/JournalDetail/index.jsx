import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { PageHeader, Row, Col, Statistic, Button } from 'antd'
import { getJournal, getInventoriesByJournalId, getSubscriptionsByJournalId } from '../../service'

import InventoryList from '../../components/InventoryList'

class JournalDetail extends Component {
  state = {
    loading: true,
    _id: '',
    name: '',
    sponsor: '',
    cn: '',
    location: '',
    issn: '',
    code: '',
    period: '',
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
          extra={[
            <Link key='edit' to={{ pathname: '/journal/edit', state: this.state }}>
              <Button type='primary'>修改</Button>
            </Link>
          ]}
        >
          <Row>
            <Col span={8}>
              <Row>
                <Col span={12}>CN 刊号： {this.state.cn}</Col>
                <Col span={12}>ISSN： {this.state.issn}</Col>
                <Col span={12}>邮发代号： {this.state.code}</Col>
                <Col span={12}>出版周期： {this.state.period}</Col>
                <Col span={12}>出版地： {this.state.location}</Col>
                <Col span={12}>主办单位： {this.state.sponsor}</Col>
              </Row>
            </Col>
            <Col span={8} offset={8}>
              <Row>
                <Col span={12}>
                  <Statistic title='订阅的年份' value={subscribYears} />
                </Col>
                <Col span={12}>
                  <Statistic title='库存总数' value={inventoriesSum} />
                </Col>
              </Row>
            </Col>
          </Row>
        </PageHeader>
        <InventoryList loading={this.state.loading} data={this.state.inventories} name={this.state.name} />
      </div>
    )
  }
}

export default JournalDetail
