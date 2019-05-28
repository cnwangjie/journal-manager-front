import React, { Component } from 'react'
import { Table, Button, Divider } from 'antd'

class InventoryList extends Component {
  render () {
    const columnsMap = {
      year: '年份',
      phase: '卷',
      season: '期'
    }

    const columns = Object.entries(columnsMap).map(([key, title]) => ({ title, key, dataIndex: key }))

    if (this.props.name == null) {
      columns.unshift({
        title: '名称',
        key: 'name',
        dataIndex: 'name'
      })
    }

    columns.push({
      title: '借阅人',
      key: 'status',
      render: (_, record) => {
        if (record.borrower) {
          return (
            <span style={{ color: 'red' }}>已借阅</span>
          )
        } else {
          return (
            <span style={{ color: 'green' }}>未借阅</span>
          )
        }
      }
    })

    columns.push({
      title: '操作',
      key: 'action',
      width: 160,
      render: (_, record) => {
        return (
          <div>
            {
              record.borrower ? (
                <Button size='small' type='link'>归还</Button>
              ) : (
                <Button size='small' type='link'>借阅</Button>
              )
            }
            <Divider type='vertical' />
            <Button size='small' type='link' onClick={() => this.deleteInventory(record)} style={{ color: 'red' }}>删除</Button>
          </div>
        )
      }
    })

    return (
      <Table style={{ padding: 30 }} loading={this.props.loading} rowKey='_id' dataSource={this.props.data} columns={columns} />
    )
  }
}

export default InventoryList
