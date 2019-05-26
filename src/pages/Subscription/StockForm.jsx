import React, { Component } from 'react'
import { observer } from 'mobx-react'
import { Form, InputNumber } from 'antd'

@observer
class AddForm extends Component {
  render () {
    const { getFieldDecorator } = this.props.form

    return (
      <Form labelCol={{ span: 6 }} wrapperCol={{ span: 14 }}>
        <Form.Item label='期刊'>
          <span className='ant-form-text'>{this.props.subscription.name}</span>
        </Form.Item>
        <Form.Item label='年份'>
          {getFieldDecorator('year', {
            initialValue: this.props.subscription.year,
            rules: [
              {
                type: 'number',
                message: '请输入有效的年份'
              },
              {
                required: true,
                message: '请输入年份'
              }
            ]
          })(<InputNumber />)}
        </Form.Item>
        <Form.Item label='卷'>
          {getFieldDecorator('phase', {
            rules: [
              {
                type: 'number',
                message: '请输入有效的卷号'
              },
              {
                required: true,
                message: '请输入卷号'
              }
            ]
          })(<InputNumber />)}
        </Form.Item>
        <Form.Item label='期'>
          {getFieldDecorator('season', {
            rules: [
              {
                type: 'number',
                message: '请输入有效的期号'
              },
              {
                required: true,
                message: '请输入期号'
              }
            ]
          })(<InputNumber />)}
        </Form.Item>
      </Form>
    )
  }
}

export default AddForm
