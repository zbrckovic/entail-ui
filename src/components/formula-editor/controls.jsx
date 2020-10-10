import { useTranslation } from 'react-i18next'
import {
  conjunction,
  disjunction,
  equivalence,
  existentialQuantifier,
  implication,
  negation,
  primitivePresentations,
  SymPresentation,
  universalQuantifier
} from '@zbrckovic/entail-core'
import React from 'react'
import style from './controls.m.scss'
import { Button, ButtonGroup, Intent } from '@blueprintjs/core'
import classnames from 'classnames'

export const Controls = ({
  onSymbol,
  onSubmit,
  onCancel,
  isSubmitDisabled,
  className,
  ...props
}) => {
  const { t } = useTranslation('FormulaEditor')

  return (
    <div className={classnames(style.root, className)} {...props}>
      <ButtonGroup className={style.symbols}>
        {
          primitiveSyms.map(({ id }) => {
            const presentation = primitivePresentations[id]

            const displayText = SymPresentation.getDefaultSyntacticInfo(presentation).text
            const text = presentation.ascii.text

            return (
              <Button
                key={id}
                className={style.symbolButton}
                onClick={() => { onSymbol(text) }}
              >
                {displayText}
              </Button>
            )
          })
        }
      </ButtonGroup>
      <ButtonGroup>
        <Button
          intent={Intent.PRIMARY}
          onClick={() => { onSubmit() }}
          disabled={isSubmitDisabled}
        >
          {t('button.submit')}
        </Button>
        <Button onClick={() => { onCancel() }}>
          {t('button.cancel')}
        </Button>
      </ButtonGroup>
    </div>
  )
}

const primitiveSyms = [
  negation,
  conjunction,
  disjunction,
  implication,
  equivalence,
  universalQuantifier,
  existentialQuantifier
]
