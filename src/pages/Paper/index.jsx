import { observer } from 'mobx-react'
import React, { Component } from 'react'
import { Table, Typography } from 'antd'
import store from '../../stores'

const { Title } = Typography

const columnsMap = {
  title: '标题',
  author: '作者',
  page: '页码',
  keywords: '关键词'
}

const columns = Object.entries(columnsMap).map(([key, title]) => ({ title, key, dataIndex: key }))

@observer
class Journal extends Component {
  componentDidMount () {
    store.data.getAllPapers()
  }

  render () {
    return (
      <div>
        <Title>论文列表</Title>
        <Table rowKey='_id' dataSource={store.data.papers} columns={columns} />
      </div>
    )
  }
}

export default Journal
