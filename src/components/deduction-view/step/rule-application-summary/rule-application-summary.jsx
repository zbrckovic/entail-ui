import { Tooltip } from '@blueprintjs/core'
import { TOOLTIP_OPEN_DELAY_MS } from 'app-constants'
import { Code } from 'components/code'
import { CodeBackground } from 'components/code-background'
import { useRuleDescriber } from 'hooks'
import React from 'react'

export const RuleApplicationSummary = ({ ruleApplicationSummary: { rule } }) => {
  const ruleDescriber = useRuleDescriber()

  const { translation, abbreviation } = ruleDescriber(rule)

  return (
    <Tooltip content={translation} hoverOpenDelay={TOOLTIP_OPEN_DELAY_MS}>
      <Code>
        <span>{abbreviation}</span>
      </Code>
    </Tooltip>

  )
}
