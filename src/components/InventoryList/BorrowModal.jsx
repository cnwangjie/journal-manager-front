import React, { Component } from 'react'
import { observer } from 'mobx-react'
import { Modal, Form, Button, message } from 'antd'
import BorrowForm from './BorrowForm'

import stores from '../../stores'

const WrappedAddForm = Form.create()(BorrowForm)

@observer
class BorrowModal extends Component {
  state = {
    loading: false
  }

  submit = () => {
    const form = this.form.props.form
    form.validateFields(async (errors, values) => {
      if (errors) return
      this.setState({ loading: true })
      await stores.data.borrowInventory(this.props.inventory._id, values.user_id)
      this.setState({ loading: false })
      this.props.onOk()
      message.success('借阅成功')
    })
  }

  render () {
    return (
      <Modal
        destroyOnClose
        title='借阅'
        visible={this.props.visible}
        onCancel={this.props.onCancel}
        footer={[
          <Button key='add' type='primary' loading={this.state.loading} onClick={this.submit}>
            提交
          </Button>
        ]}
      >
        <WrappedAddForm inventory={this.props.inventory} wrappedComponentRef={(ref) => { this.form = ref }} />
      </Modal>
    )
  }
}

export default BorrowModal
