import { observer } from 'mobx-react'
import React, { Component } from 'react'
import { Table, Typography } from 'antd'
import store from '../../stores'

const { Title } = Typography

const columnsMap = {
  name: '名称',
  sponsor: '主办单位',
  cn: 'CN',
  location: '出版地',
  issn: 'ISSN',
  code: '邮发代号',
  period: '出版周期'
}

const columns = Object.entries(columnsMap).map(([key, title]) => ({ title, key, dataIndex: key }))

@observer
class Journal extends Component {
  componentDidMount () {
    store.data.getAllJournals()
  }

  render () {
    return (
      <div>
        <Title>期刊列表</Title>
        <Table dataSource={store.data.journals} columns={columns} />
      </div>
    )
  }
}

export default Journal
