import React, { Component } from 'react'
import { Form, PageHeader, Button, message } from 'antd'
import stores from '../../stores'

import EditForm from './EditForm'

const WrappedEditForm = Form.create()(EditForm)

class PaperEdit extends Component {
  savePaper = async () => {
    const form = this.form.props.form
    form.validateFields(async (errors, values) => {
      if (errors) return
      this.setState({ loading: true })
      values.keywords = values.keywords.filter(i => i.trim())
      await stores.data.changeOrCreatePaper(values)
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
          title='修改论文'
          extra={[
            <Button key='save' type='primary' onClick={this.savePaper}>保存</Button>
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

export default PaperEdit
