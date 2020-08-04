import { Tooltip } from '@blueprintjs/core'
import { TOOLTIP_OPEN_DELAY_MS } from 'app-constants'
import { Code } from 'components/code'
import { useRuleDescriber } from 'hooks'
import React, { useMemo } from 'react'
import style from './rule-application-summary.module.scss'

export const RuleApplicationSummary = ({ ruleApplicationSummary: { rule, premises } }) => {
  const ruleDescriber = useRuleDescriber()
  const { translation, abbreviation } = ruleDescriber(rule)

  const premisesOrdered = useMemo(() => premises.toArray(), [premises])


  return (
    <Tooltip content={translation} hoverOpenDelay={TOOLTIP_OPEN_DELAY_MS}>
      <Code className={style.container}>
        <span className={style.rule}>{abbreviation}</span>
        {premisesOrdered.map((premise, i) => {
          const isLast = i === premisesOrdered.length - 1
          return (
            <span key={premise}>
              <span>{premise + 1}</span>
              {isLast || <span>,&nbsp;</span>}
            </span>
          )
        })}
      </Code>
    </Tooltip>

  )
}
