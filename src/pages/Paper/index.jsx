import { observer } from 'mobx-react'
import React, { Component } from 'react'
import { Table, PageHeader, Button, Row, Col, Statistic } from 'antd'
import store from '../../stores'

const columnsMap = {
  title: '标题',
  author: '作者',
  page: '页码',
  keywords: '关键词'
}

const columns = Object.entries(columnsMap).map(([key, title]) => ({ title, key, dataIndex: key }))

@observer
class Paper extends Component {
  componentDidMount () {
    store.data.getAllPapers()
  }

  render () {
    return (
      <div>
        <PageHeader
          title='论文列表'
          extra={[
            <Button type='primary'>新增论文</Button>
          ]}
        >
          <Row>
            <Col span={12}>
              <Statistic title='论文总数' value={store.data.papers.length} />
            </Col>
            <Col span={12}>
              <Statistic title='关键词数' value={store.data.keywords.length} />
            </Col>
          </Row>
        </PageHeader>
        <Table rowKey='_id' dataSource={store.data.mappedPapers} columns={columns} />
      </div>
    )
  }
}

export default Paper
