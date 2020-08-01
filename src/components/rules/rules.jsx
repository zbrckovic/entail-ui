import React from 'react'
import { RulesKeyboard } from './rules-keyboard'

export const Rules = ({ rulesInterface = {} }) =>
  <RulesKeyboard
    rules={rulesInterface}
    onRule={rule => { console.log(rule) }}
  />
