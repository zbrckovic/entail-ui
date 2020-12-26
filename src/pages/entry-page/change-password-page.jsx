import React from 'react'
import style from './change-password-page.m.scss'
import { useParams } from 'react-router-dom'

export const ChangePasswordPage = () => {
  const { token } = useParams()

  return <div className={style.root}>
    {token}
  </div>
}
