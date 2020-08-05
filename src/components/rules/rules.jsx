import { Rule } from '@zbrckovic/entail-core/lib/deduction-structure/rule'
import { useRuleDescriber } from 'hooks'
import React, { useState } from 'react'
import style from './rules.module.scss'

export const Rules = ({ rules = {} }) => {
  const ruleDescriber = useRuleDescriber()

  const [, setSelectedRule] = useState()

  return <>
    <div className={style.container}>
      {
        allRules.map(rule => {
          const { translation, abbreviation } = ruleDescriber(rule)
          return <button
            key={rule}
            title={translation}
            disabled={rules[rule] === undefined}
            onClick={() => { setSelectedRule(rule) }}
          >
            {abbreviation}
          </button>
        })
      }
    </div>
  </>
}

const allRules = [
  Rule.Premise,
  Rule.TautologicalImplication,
  Rule.Deduction,
  Rule.Theorem,
  Rule.UniversalInstantiation,
  Rule.UniversalGeneralization,
  Rule.ExistentialInstantiation,
  Rule.ExistentialGeneralization
]
