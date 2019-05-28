import React, { Component } from 'react'
import { observer } from 'mobx-react'
import { Form, Input, Select } from 'antd'
import stores from '../../stores'
import KeywordsInput from '../../components/KeywordsInput'

const { Option } = Select

@observer
class AddForm extends Component {
  componentDidMount () {
    stores.data.getAllInventories()
  }

  render () {
    const { getFieldDecorator } = this.props.form

    const fields = {
      title: '标题',
      author: '作者',
      page: '页码'
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

    const inventories = stores.data.mappedInventories.map(inventory => (
      <Option key={inventory._id} value={inventory._id}>{inventory.name} {inventory.year}年 第{inventory.season}期</Option>
    ))

    const InventorySelector = (
      <Select
        showSearch
        optionFilterProp='children'
        filterOption={(input, option) => {
          return ~option.props.children.toString().indexOf(input)
        }}
      >
        {inventories}
      </Select>
    )

    items.unshift(
      <Form.Item key='inventory_id' label='期刊'>
        {getFieldDecorator('inventory_id', {
          rules: [
            {
              required: true,
              message: '请选择期刊'
            }
          ]
        })(InventorySelector)}
      </Form.Item>
    )

    items.push(
      <Form.Item key='keywords' label='关键词'>
        {getFieldDecorator('keywords', {
          rules: [
            {
              required: true,
              message: '请输入关键词'
            }
          ]
        })(<KeywordsInput />)}
      </Form.Item>
    )

    return (
      <Form labelCol={{ span: 6 }} wrapperCol={{ span: 14 }}>
        {items}
      </Form>
    )
  }
}

export default AddForm
