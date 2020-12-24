import React, { useState } from 'react'
import { Button, FormGroup, InputGroup, Intent } from '@blueprintjs/core'
import { IconNames } from '@blueprintjs/icons'
import { Link, useRouteMatch } from 'react-router-dom'

export const LoginPageForm = ({ onSubmit, isLoading }) => {
  const [state, setState] = useState({ email: undefined, password: undefined })
  const { url } = useRouteMatch()

  return (
    <form onSubmit={event => {
      event.preventDefault()
      onSubmit(state)
    }}>
      <FormGroup label="Email" disabled={isLoading}>
        <InputGroup
          placeholder="Email"
          onChange={({ target: { value } }) => {
            setState({ ...state, email: value })
          }}
        />
      </FormGroup>
      <FormGroup label="Password">
        <InputGroup
          type="password"
          placeholder="Password"
          onChange={({ target: { value } }) => {
            setState({ ...state, password: value })
          }}
        />
      </FormGroup>
      <Link to={`${url}/forgot-password`}>Forgot password</Link>
      <Button
        loading={isLoading}
        type="submit"
        icon={IconNames.LOG_IN}
        intent={Intent.PRIMARY}
      >
        Login
      </Button>
    </form>
  )
}
