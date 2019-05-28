import React, { Component } from 'react'
import { Table, Button, Divider, message } from 'antd'
import store from '../../stores'

import { stop } from '../../utils'

import PaperList from '../PaperList'
import BorrowModal from './BorrowModal'

const expandedRowRender = (record) => {
  return (
    <PaperList inventoryId={record._id} />
  )
}

class InventoryList extends Component {
  state = {
    showBorrowModal: false,
    borrowItem: null
  }

  deleteInventory = async (inventory) => {
    await store.data.deleteInventory(inventory._id)
    message.success('删除成功')
  }

  returnInventory = async (inventory) => {
    await store.data.returnInventory(inventory._id)
    message.success('归还成功')
  }

  openBorrowModal = (inventory) => {
    this.setState({ showBorrowModal: true, borrowItem: inventory })
  }

  closeBorrowModal = () => {
    this.setState({ showBorrowModal: false, borrowItem: null })
  }

  render () {
    const columnsMap = {
      year: '年份',
      phase: '卷',
      season: '期'
    }

    const columns = Object.entries(columnsMap).map(([key, title]) => ({
      title,
      key,
      dataIndex: key,
      sorter: (a, b) => a[key] - b[key]
    }))

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
            <span>{record.borrower}</span>
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
                <Button size='small' type='link' onClick={stop(this.returnInventory, record)}>归还</Button>
              ) : (
                <Button size='small' type='link' onClick={stop(this.openBorrowModal, record)}>借阅</Button>
              )
            }
            <Divider type='vertical' />
            <Button size='small' type='link' onClick={stop(this.deleteInventory, record)} style={{ color: 'red' }}>删除</Button>
          </div>
        )
      }
    })

    return (
      <div>
        <Table
          style={{ padding: 30 }} loading={this.props.loading} rowKey='_id' dataSource={this.props.data} columns={columns}
          expandRowByClick expandedRowRender={expandedRowRender}
        />

        <BorrowModal
          visible={this.state.showBorrowModal}
          onOk={this.closeBorrowModal}
          onCancel={this.closeBorrowModal}
          inventory={this.state.borrowItem}
        />
      </div>
    )
  }
}

export default InventoryList
