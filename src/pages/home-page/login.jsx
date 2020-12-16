import React, { useState } from 'react'
import { Button, FormGroup, InputGroup, Intent } from '@blueprintjs/core'
import { IconNames } from '@blueprintjs/icons'

export const Login = ({ onSubmit }) => {
  const [state, setState] = useState({
    username: undefined,
    password: undefined
  })

  return (
    <form onSubmit={event => {
      event.preventDefault()
      onSubmit(state)
    }}>
      <FormGroup label="Username">
        <InputGroup
          placeholder="Username"
          onChange={({ target: { value } }) => {
            setState({ ...state, username: value })
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
