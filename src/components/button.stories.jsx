import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import { Button } from 'components/button'
import React from 'react'

export default {
  title: 'Button',
  component: Button
}

export const Normal = () =>
  <div>
    <Button
      icon={faCheckCircle}
    >{'Example'}</Button>
  </div>

export const Primary = () =>
  <div>
    <Button
      icon={faCheckCircle}
      variant='primary'
    >{'Example'}</Button>
  </div>
