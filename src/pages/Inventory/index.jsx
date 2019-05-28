import _ from 'lodash'
import { observer } from 'mobx-react'
import React, { Component } from 'react'
import { message, PageHeader, Row, Col, Statistic } from 'antd'
import store from '../../stores'

import InventoryList from '../../components/InventoryList'

@observer
class Inventory extends Component {
  state = { loading: true }

  deleteInventory = async (inventory) => {
    await store.data.deleteInventory(inventory._id)
    message.success('删除成功')
  }

  async componentDidMount () {
    await store.data.getAllInventories()
    this.setState({ loading: false })
  }

  render () {
    const { length: journalSum } = _.uniqBy(store.data.inventories, 'journal_id')
    const { length: allSum } = store.data.inventories

    return (
      <div>
        <PageHeader
          title='库存列表'
        >
          <Row>
            <Col span={12}>
              <Statistic title='期刊种类' value={journalSum} />
            </Col>
            <Col span={12}>
              <Statistic title='期刊总数' value={allSum} />
            </Col>
          </Row>
        </PageHeader>
        <InventoryList loading={this.state.loading} data={store.data.mappedInventories} />
      </div>
    )
  }
}

export default Inventory
