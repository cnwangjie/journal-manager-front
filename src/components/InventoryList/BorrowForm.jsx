import React, { Component } from 'react'
import { observer } from 'mobx-react'
import { Form, Select } from 'antd'

import store from '../../stores'

const { Option } = Select

@observer
class AddForm extends Component {
  componentDidMount () {
    store.data.getAllJournals()
  }

  render () {
    const users = store.data.users.map(user => (
      <Option key={user._id} value={user._id}>{user.name}</Option>
    ))

    const UserSelector = (
      <Select>
        {users}
      </Select>
    )

    const { getFieldDecorator } = this.props.form
    const { inventory } = this.props
    return (
      <Form labelCol={{ span: 6 }} wrapperCol={{ span: 14 }}>
        <Form.Item label='期刊'>
          <span className='ant-form-text'>{inventory.name} {inventory.year}年 第{inventory.season}期</span>
        </Form.Item>
        <Form.Item label='借阅人'>
          {getFieldDecorator('user_id', {
            rules: [
              {
                required: true,
                message: '请选择借阅人'
              }
            ]
          })(UserSelector)}
        </Form.Item>
      </Form>
    )
  }
}

export default AddForm
