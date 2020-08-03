import { Button, Dialog } from '@blueprintjs/core'
import { Rule } from '@zbrckovic/entail-core/lib/deduction-structure/rule'
import { useRuleDescriber } from 'hooks'
import React, { useMemo, useState } from 'react'
import style from './rules.module.scss'

export const Rules = ({ rules = {}, onRuleApplied }) => {
  const ruleDescriber = useRuleDescriber()

  const [selectedRule, setSelectedRule] = useState()

  const dialog = useMemo(
    () => <div>{ruleDescriber(selectedRule).translation}</div>,
    [ruleDescriber, selectedRule]
  )

  return <>
    <div className={style.container}>
      {
        allRules.map(rule => {
          const { translation, abbreviation } = ruleDescriber(rule)
          return <Button
            key={rule}
            title={translation}
            disabled={rules[rule] === undefined}
            onClick={() => { setSelectedRule(rule) }}
          >{abbreviation}</Button>
        })
      }
    </div>
    <Dialog
      isOpen={dialog !== undefined}
      onClose={() => { setSelectedRule(undefined) }}
    >
      {dialog}
    </Dialog>
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
