import { observer } from 'mobx-react'
import React, { Component } from 'react'
import { Table, Button, PageHeader, Row, Col, Statistic, Input } from 'antd'
import store from '../../stores'

const columnsMap = {
  sponsor: '主办单位',
  cn: 'CN',
  location: '出版地',
  issn: 'ISSN',
  code: '邮发代号',
  period: '出版周期'
}

const columns = Object.entries(columnsMap).map(([key, title]) => ({
  title,
  key,
  dataIndex: key,
  sorter: (a, b) => a[key] > b[key] ? 1 : -1,
  sortDirections: ['descend', 'ascend']
}))

columns.unshift({
  title: '名称',
  key: 'name',
  render: (_, record) => {
    return (
      <Button type='link' onClick={() => { store.route.push(`/journal/${record._id}`) }}>{record.name}</Button>
    )
  }
})

@observer
class Journal extends Component {
  state = { loading: true, search: '' }

  async componentDidMount () {
    await store.data.getAllJournals()
    this.setState({ loading: false })
  }

  render () {
    const qs = this.state.search.split(' ').map(i => i.trim()).filter(i => i).map(i => i.split(':').map(i => i.trim()))
    let filteredJournals = store.data.journals
    qs.forEach(([k, v]) => {
      if (v != null) filteredJournals = filteredJournals.filter(({ [k]: value }) => ~value.toString().indexOf(v))
      else if (v !== '') filteredJournals = filteredJournals.filter(({ name }) => ~name.indexOf(k))
    })
    return (
      <div>
        <PageHeader
          title='期刊列表'
          extra={[
            <Input.Search
              key='search-form' placeholder='查询'
              style={{ width: 160, paddingRight: 8 }}
              onSearch={(c) => this.setState({ search: c })}
            />,
            <Button key='add-btn' type='primary' onClick={() => store.route.push('/journal/edit')}>新增期刊</Button>
          ]}
        >
          <Row>
            <Col span={6}>
              <Statistic title='期刊总数' value={store.data.journals.length} />
            </Col>
          </Row>
        </PageHeader>
        <Table loading={this.state.loading} rowKey='_id' dataSource={filteredJournals} columns={columns} />
      </div>
    )
  }
}

export default Journal
