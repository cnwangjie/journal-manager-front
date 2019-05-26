import React, { Component } from 'react'
import { observer } from 'mobx-react'
import { Modal, Form, Button, message } from 'antd'
import AddForm from './AddForm'

import stores from '../../stores'

const WrappedAddForm = Form.create()(AddForm)

@observer
class AddModal extends Component {
  state = {
    loading: false
  }

  submit = () => {
    const form = this.form.props.form
    form.validateFields(async (errors, values) => {
      if (errors) return
      this.setState({ loading: true })
      await stores.data.addSubscription(values)
      this.setState({ loading: false })
      this.props.onOk()
      message.success('添加成功')
    })
  }

  render () {
    return (
      <Modal
        destroyOnClose
        title='增订期刊'
        visible={this.props.visible}
        onCancel={this.props.onCancel}
        footer={[
          <Button key='add' type='primary' loading={this.state.loading} onClick={this.submit}>
            提交
          </Button>
        ]}
      >
        <WrappedAddForm wrappedComponentRef={(ref) => { this.form = ref }} />
      </Modal>
    )
  }
}

export default AddModal
