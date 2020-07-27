import { App } from 'app'
import { RootWrapper } from 'common-wrapper'
import React from 'react'
import ReactDOM from 'react-dom'

import { DeductionInterface } from '@zbrckovic/entail-core'

console.log(new DeductionInterface())

ReactDOM.render(
  <RootWrapper><App/></RootWrapper>,
  document.getElementById('root')
)
