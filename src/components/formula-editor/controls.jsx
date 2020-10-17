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
import { IconNames } from '@blueprintjs/icons'

export const Controls = ({
  onSymbol,
  onSubmit,
  onCancel,
  isSubmitDisabled,
  className,
  ...props
}) => {
  const { t } = useTranslation('FormulaEditor')
  const primitiveSymsT = usePrimitiveSymsTranslation()

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
                title={primitiveSymsT(id)}
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
          title={t('button.submit')}
          intent={Intent.PRIMARY}
          onClick={() => { onSubmit() }}
          disabled={isSubmitDisabled}
          icon={IconNames.CONFIRM}
        >
          {t('button.submit')}
        </Button>
        <Button
          icon={IconNames.DISABLE}
          title={t('button.cancel')}
          onClick={() => { onCancel() }}
        >
          {t('button.cancel')}
        </Button>
      </ButtonGroup>
    </div>
  )
}

const usePrimitiveSymsTranslation = () => {
  const { t } = useTranslation('PrimitiveSymbols')
  return symId => {
    switch (symId) {
      case negation.id:
        return t('negation')
      case conjunction.id:
        return t('conjunction')
      case disjunction.id:
        return t('disjunction')
      case implication.id:
        return t('implication')
      case equivalence.id:
        return t('equivalence')
      case universalQuantifier.id:
        return t('universalQuantifier')
      case existentialQuantifier.id:
        return t('existentialQuantifier')
    }
  }
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
