import React, { Component } from 'react'
import { Form, PageHeader, Button, message } from 'antd'
import stores from '../../stores'

import EditForm from './EditForm'

const WrappedEditForm = Form.create()(EditForm)

class JournalEdit extends Component {
  saveJournal = async () => {
    const form = this.form.props.form
    form.validateFields(async (errors, values) => {
      if (errors) return
      this.setState({ loading: true })
      await stores.data.changeOrCreateJournal(values)
      this.setState({ loading: false })
      message.success('保存成功')
      stores.route.goBack()
    })
  }

  render () {
    return (
      <div>
        <PageHeader
          onBack={() => stores.route.goBack()}
          title='修改期刊'
          extra={[
            <Button key='save' type='primary' onClick={this.saveJournal}>保存</Button>
          ]}
        />
        <WrappedEditForm
          key='edit-form' default={stores.route.location.state}
          wrappedComponentRef={(ref) => { this.form = ref }}
        />
      </div>
    )
  }
}

export default JournalEdit
