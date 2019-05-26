import React, { Component } from 'react'
import { observer } from 'mobx-react'
import { Modal, Form, Button, message } from 'antd'
import StockForm from './StockForm'

import stores from '../../stores'

const WrappedStockForm = Form.create()(StockForm)

@observer
class StockModal extends Component {
  state = {
    loading: false
  }

  submit = () => {
    const form = this.form.props.form
    form.validateFields(async (errors, values) => {
      if (errors) return
      this.setState({ loading: true })
      await stores.data.stockSubscription(this.props.subscription._id, values)
      this.setState({ loading: false })
      this.props.onOk()
      message.success('入库成功')
    })
  }

  render () {
    return (
      <Modal
        title='入库期刊'
        visible={this.props.visible}
        onCancel={this.props.onCancel}
        onOk={this.props.onOk}
        footer={[
          <Button key='add' type='primary' loading={this.state.loading} onClick={this.submit}>
            入库
          </Button>
        ]}
      >
        <WrappedStockForm
          subscription={this.props.subscription}
          wrappedComponentRef={(ref) => { this.form = ref }}
        />
      </Modal>
    )
  }
}

export default StockModal
