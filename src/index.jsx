import { App } from 'app'
import { CommonWrapper } from 'common-wrapper'
import React from 'react'
import ReactDOM from 'react-dom'

import { DeductionInterface } from '@zbrckovic/entail-core'

console.log(new DeductionInterface())

ReactDOM.render(
  <CommonWrapper><App/></CommonWrapper>,
  document.getElementById('root')
)
