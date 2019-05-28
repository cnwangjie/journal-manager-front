import { observer } from 'mobx-react'
import React, { Component } from 'react'
import { Input, PageHeader, Button, Row, Col, Statistic } from 'antd'
import store from '../../stores'

import PaperList from '../../components/PaperList'

@observer
class Paper extends Component {
  state = { q: '' }

  render () {
    return (
      <div>
        <PageHeader
          title='论文列表'
          extra={[
            <Input.Search
              key='search-form' placeholder='查询'
              style={{ width: 160, paddingRight: 8 }}
              onSearch={(q) => this.setState({ q })}
            />,
            <Button key='add' type='primary' onClick={() => store.route.push('/paper/edit')}>新增论文</Button>
          ]}
        >
          <Row>
            <Col span={6}>
              <Statistic title='论文总数' value={store.data.papers.length} />
            </Col>
            <Col span={6}>
              <Statistic title='关键词数' value={store.data.keywords.length} />
            </Col>
          </Row>
        </PageHeader>
        <PaperList q={this.state.q} />
      </div>
    )
  }
}

export default Paper
