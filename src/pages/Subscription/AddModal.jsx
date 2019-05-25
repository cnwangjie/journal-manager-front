import React, { Component } from 'react'
import { observer } from 'mobx-react'
import { Modal, Form } from 'antd'
import AddForm from './AddForm'

@observer
class AddModal extends Component {
  render () {
    const WrappedAddForm = Form.create()(AddForm)
    return (
      <Modal
        title='增订期刊'
        visible={this.props.visible}
        onCancel={this.props.onCancel}
        onOk={this.props.onOk}
      >
        <WrappedAddForm />
      </Modal>
    )
  }
}

export default AddModal
