import React from 'react'
import { DeductionView } from '../deduction-view'
import { Rules } from '../rules'
import style from './deduction-editor.module.scss'

export const DeductionEditor = () => {
  return (
    <div className={style.container}>
      <DeductionView/>
      <Rules/>
    </div>
  )
}
