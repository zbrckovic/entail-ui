import React, { forwardRef, useImperativeHandle, useState } from 'react'
import style from './status-display.m.scss'
import classnames from 'classnames'
import { IntentText } from '../intent-text'
import { Code } from '@blueprintjs/core'

const _StatusDisplay = ({ className }, ref) => {
  const [statuses, setStatuses] = useState([])

  useImperativeHandle(ref, () => ({
    publish: status => { setStatuses([...statuses, status]) }
  }))

  return (
    <Code className={classnames(style.root, className)}>
      {
        statuses.map((status, i) => (
          <IntentText key={i} intent={status.intent}>{status.message}</IntentText>
        ))
      }
    </Code>
  )
}

export const StatusDisplay = forwardRef(_StatusDisplay)
