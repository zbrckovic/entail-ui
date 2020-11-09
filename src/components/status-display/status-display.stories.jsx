import { StatusDisplay } from './status-display'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { RootCtx } from '../../contexts'
import { Button, ButtonGroup, Intent, TextArea } from '@blueprintjs/core'
import style from './status-display.stories.m.scss'

export default {
  title: 'StatusDisplay',
  component: StatusDisplay,
  argTypes: {
    isDark: {
      control: 'boolean'
    }
  }
}

const intents = [
  Intent.PRIMARY,
  Intent.SUCCESS,
  Intent.WARNING,
  Intent.DANGER
]

export const Default = ({ isDark }) => {
  const { theme: { setIsDark } } = useContext(RootCtx)
  useEffect(() => { setIsDark(isDark) }, [isDark, setIsDark])

  const [text, setText] = useState('')

  const ref = useRef()

  return (
    <div className={style.root}>
      <ButtonGroup>
        {intents.map(intent => <Button key={intent} intent={intent} onClick={() => {
          ref.current.publish({ message: text })
        }}>{intent}</Button>)}
      </ButtonGroup>
      <TextArea value={text} onChange={event => setText(event.target.value)} />
      <StatusDisplay ref={ref} />
    </div>
  )
}
