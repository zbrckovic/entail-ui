import React, { useState } from 'react'
import { Button, FormGroup, InputGroup, Intent } from '@blueprintjs/core'
import { IconNames } from '@blueprintjs/icons'
import { Link, useRouteMatch } from 'react-router-dom'
import style from './login-page-form.m.scss'

export const LoginPageForm = ({ onSubmit, isLoading }) => {
  const [state, setState] = useState({ email: undefined, password: undefined })
  const { url } = useRouteMatch()

  return (
    <form
      className={style.root}
      onSubmit={event => {
        event.preventDefault()
        onSubmit(state)
      }}
    >
      <FormGroup label="Email" disabled={isLoading}>
        <InputGroup
          placeholder="Email"
          onChange={({ target: { value } }) => {
            setState({ ...state, email: value })
          }}
        />
      </FormGroup>
      <FormGroup
        className={style.passwordFormGroup}
        label="Password"
      >
        <InputGroup
          type="password"
          placeholder="Password"
          onChange={({ target: { value } }) => {
            setState({ ...state, password: value })
          }}
        />
      </FormGroup>
      <div className={style.forgotPasswordContainer}>
        <Link to='/forgot-password'>
          Forgot password?
        </Link>
      </div>
      <Button
        loading={isLoading}
        type="submit"
        icon={IconNames.LOG_IN}
        intent={Intent.PRIMARY}
      >
        Login
      </Button>
      <div className={style.dontHaveAnAccountContainer}>
        <Link to={'/register'}>
          {'Don\'t have an account yet?'}
        </Link>
      </div>
    </form>
  )
}
