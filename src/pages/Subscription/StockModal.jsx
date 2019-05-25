import React, { Component } from 'react'
import { observer } from 'mobx-react'
import { Modal, Form } from 'antd'
import StockForm from './StockForm'

@observer
class StockModal extends Component {
  render () {
    const WrappedStockForm = Form.create()(StockForm)
    console.log(this.props)
    return (
      <Modal
        title='入库期刊'
        visible={this.props.visible}
        onCancel={this.props.onCancel}
        onOk={this.props.onOk}
      >
        <WrappedStockForm subscription={this.props.subscription} />
      </Modal>
    )
  }
}

export default StockModal
