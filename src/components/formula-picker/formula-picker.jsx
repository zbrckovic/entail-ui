import { Button, Label } from '@blueprintjs/core'
import React from 'react'
import { ExpressionView } from '../expression-view'
import classNames from 'classnames'
import style from './formula-picker.m.scss'

export const FormulaPicker = ({ formulas, onSelect, labels = [], className, ...props }) => (
  <div className={classNames(style.root, className)} {...props}>
    {formulas.map((formula, i) => {
      const label = labels?.[i]

      return (
        <div key={i}>
          {label !== undefined && <Label>{label}</Label>}
          <Button onClick={() => { onSelect(formula, i) }}>
            <ExpressionView expression={formula}/>
          </Button>
        </div>
      )
    })}
  </div>
)
