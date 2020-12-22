import React, { useState } from 'react'
import { Button, FormGroup, InputGroup, Intent } from '@blueprintjs/core'
import { IconNames } from '@blueprintjs/icons'

export const Login = ({ onSubmit }) => {
  const [state, setState] = useState({
    email: undefined,
    password: undefined
  })

  return (
    <form onSubmit={event => {
      event.preventDefault()
      onSubmit(state)
    }}>
      <FormGroup label="Email">
        <InputGroup
          placeholder="Email"
          onChange={({ target: { value } }) => {
            setState({ ...state, email: value })
          }}
        />
      </FormGroup>
      <FormGroup label="Password">
        <InputGroup
          placeholder="Password"
          onChange={({ target: { value } }) => {
            setState({ ...state, password: value })
          }}
        />
      </FormGroup>
      <Button
        type="submit"
        icon={IconNames.LOG_IN}
        intent={Intent.PRIMARY}
      >
        Login
      </Button>
    </form>
  )
}
