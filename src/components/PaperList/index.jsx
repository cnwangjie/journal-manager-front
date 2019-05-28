import { observer } from 'mobx-react'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Table, Button, message } from 'antd'
import store from '../../stores'
import { stop } from '../../utils'

const columnsMap = {
  title: '标题',
  author: '作者',
  page: '页码',
  keywords: '关键词'
}

const columns = Object.entries(columnsMap).map(([key, title]) => ({ title, key, dataIndex: key }))

@observer
class PaperList extends Component {
  state = { loading: true }

  async componentDidMount () {
    await store.data.getAllPapers()
    this.setState({ loading: false })
  }

  deletePaper = async (paper) => {
    await store.data.deletePaper(paper._id)
    message.success('删除成功')
  }

  render () {
    const fullColumns = columns.slice()
    let data = store.data.mappedPapers

    const { inventoryId } = this.props
    if (inventoryId) {
      data = data.filter(({ inventory_id: id }) => id === this.props.inventoryId)
        .sort((a, b) => parseInt(a.page) - parseInt(b.page))
    } else {
      fullColumns.push({
        title: '期刊',
        key: 'source',
        render: (_, record) => {
          return (
            <span>
              <Link to={'/journal/' + record.journal_id}>{record.name}</Link>
              &nbsp;{record.year}年 第{record.season}期
            </span>
          )
        }
      })
    }

    fullColumns.push({
      title: '操作',
      key: 'action',
      width: 80,
      render: (_, record) => {
        return (
          <Button size='small' type='link' onClick={stop(this.deletePaper, record)} style={{ color: 'red' }}>删除</Button>
        )
      }
    })

    const { q } = this.props
    if (q) {
      data = data.filter(({ title, author, keywords }) => {
        return [title, author, keywords].some((v) => ~v.indexOf(q))
      })
    }

    return (
      <Table rowKey='_id' pagination={!inventoryId} loading={this.state.loading} dataSource={data} columns={fullColumns} />
    )
  }
}

export default PaperList
