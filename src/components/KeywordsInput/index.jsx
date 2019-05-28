import React, { Component } from 'react'
import { Input } from 'antd'

class KeywordsInput extends Component {
  state = { keywords: [] }

  render () {
    return (
      <Input
        placeholder='关键词（空格分隔）'
        value={this.state.keywords.join(' ')}
        onChange={(e) => {
          const v = e.target.value.split(' ')
          this.setState({ keywords: v })
        }}
      />
    )
  }
}

export default KeywordsInput
