import React, { Component } from 'react'
import { observer } from 'mobx-react'
import { Form, Select, Input, Divider, Icon } from 'antd'

import store from '../../stores'

const { Option } = Select

@observer
class AddForm extends Component {
  componentDidMount () {
    store.data.getAllJournals()
  }

  render () {
    const journals = store.data.journals.map(journal => (
      <Option value={journal._id}>{journal.name} {journal.code}</Option>
    ))

    const JournalSelector = (
      <Select
        dropdownRender={menu => (
          <div>
            {menu}
            <Divider style={{ margin: '4px 0' }} />
            <div style={{ padding: '8px', cursor: 'pointer' }}>
              <Icon type='plus' /> 新增期刊
            </div>
          </div>
        )}
      >
        {journals}
      </Select>
    )

    const { getFieldDecorator } = this.props.form

    return (
      <Form>
        <Form.Item label='期刊'>
          {getFieldDecorator('journal_id', {
            rules: [
              {
                required: true,
                message: '请选择要订阅的期刊'
              }
            ]
          })(JournalSelector)}
        </Form.Item>
        <Form.Item label='订阅年份'>
          {getFieldDecorator('year', {
            rules: [
              {
                type: 'number',
                message: '请输入有效的年份'
              },
              {
                required: true,
                message: '请输入要订阅的年份'
              }
            ]
          })(<Input />)}
        </Form.Item>
      </Form>
    )
  }
}

export default AddForm
