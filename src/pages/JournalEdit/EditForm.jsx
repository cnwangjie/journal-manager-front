import React, { Component } from 'react'
import { observer } from 'mobx-react'
import { Form, Input } from 'antd'

@observer
class AddForm extends Component {
  render () {
    const { getFieldDecorator } = this.props.form

    const fields = {
      name: '期刊名称',
      sponsor: '出版单位',
      cn: 'CN 刊号',
      location: '出版地',
      issn: 'ISSN',
      code: '邮发代号',
      period: '出版周期'
    }

    const items = Object.entries(fields).map(([key, name]) => {
      return (
        <Form.Item key={key} label={name}>
          {getFieldDecorator(key, {
            initialValue: this.props.default ? this.props.default[key] : '',
            rules: [
              {
                required: true,
                message: '请输入' + name
              }
            ]
          })(<Input />)}
        </Form.Item>
      )
    })

    return (
      <Form labelCol={{ span: 6 }} wrapperCol={{ span: 14 }}>
        {items}
      </Form>
    )
  }
}

export default AddForm
