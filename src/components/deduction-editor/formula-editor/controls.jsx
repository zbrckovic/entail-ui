import { useTranslation } from 'react-i18next'
import {
  biconditional,
  conditional,
  conjunction,
  disjunction,
  existentialQuantifier,
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
  const { t } = useTranslation()
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
          title={t('submitLbl')}
          intent={Intent.PRIMARY}
          onClick={() => { onSubmit() }}
          disabled={isSubmitDisabled}
          icon={IconNames.CONFIRM}
        >
          {t('submitLbl')}
        </Button>
        <Button
          icon={IconNames.DISABLE}
          title={t('cancelLbl')}
          onClick={() => { onCancel() }}
        >
          {t('cancelLbl')}
        </Button>
      </ButtonGroup>
    </div>
  )
}

const usePrimitiveSymsTranslation = () => {
  const { t } = useTranslation()
  return symId => {
    switch (symId) {
      case negation.id:
        return t('deductionEditor.negationLbl')
      case conjunction.id:
        return t('deductionEditor.conjunctionLbl')
      case disjunction.id:
        return t('deductionEditor.disjunctionLbl')
      case conditional.id:
        return t('deductionEditor.conditionalLbl')
      case biconditional.id:
        return t('deductionEditor.biconditionalLbl')
      case universalQuantifier.id:
        return t('deductionEditor.universalQuantifierLbl')
      case existentialQuantifier.id:
        return t('deductionEditor.existentialQuantifierLbl')
    }
  }
}

const primitiveSyms = [
  negation,
  conjunction,
  disjunction,
  conditional,
  biconditional,
  universalQuantifier,
  existentialQuantifier
]
