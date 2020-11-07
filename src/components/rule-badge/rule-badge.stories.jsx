import React from 'react'
import { RuleBadge } from './rule-badge'
import { Rule } from '@zbrckovic/entail-core'
import style from './rule-badge.stories.m.scss'

export default {
  title: 'RuleBadge',
  component: RuleBadge
}

export const Default = () => (
  <div className={style.root}>
    {rules.map(rule => <RuleBadge key={rule} rule={rule} />)}
  </div>
)

const rules = Object.values(Rule)
