import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import { Button } from 'components/button'
import { Intent } from 'components/intent'
import React from 'react'

export default {
  title: 'Button',
  component: Button
}

export const Default = () =>
  <div>
    <Button
      intent={Intent.PRIMARY}
      disabled={true}
      icon={faCheckCircle}
    >{'Example'}</Button>
  </div>
