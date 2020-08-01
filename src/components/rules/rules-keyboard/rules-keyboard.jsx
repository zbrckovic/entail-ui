import React from 'react'
import style from './rules-keyboard.module.scss'
import { Button } from '@blueprintjs/core'
import { useTranslation } from 'react-i18next'
import { Rule } from '@zbrckovic/entail-core/lib/deduction-structure/rule'

/** Shows the button for each available rule */
export const RulesKeyboard = ({ rules, onRule }) => {
  const { t } = useTranslation('Rules')

  return (
    <div className={style.container}>
      <Button
        title={t('label.premise')}
        disabled={rules[Rule.Premise] === undefined}
        onClick={() => { onRule(Rule.Premise) }}
      >
        {t('label.premise-abbreviated')}
      </Button>
      <Button
        title={t('label.tautological-implication')}
        disabled={rules[Rule.TautologicalImplication] === undefined}
        onClick={() => { onRule(Rule.TautologicalImplication) }}
      >
        {t('label.tautological-implication-abbreviated')}
      </Button>
      <Button
        title={t('label.deduction')}
        disabled={rules[Rule.Deduction] === undefined}
        onClick={() => { onRule(Rule.Deduction) }}
      >
        {t('label.deduction-abbreviated')}
      </Button>
      <Button
        title={t('label.theorem')}
        disabled={rules[Rule.Theorem] === undefined}
        onClick={() => { onRule(Rule.Theorem) }}
      >
        {t('label.theorem-abbreviated')}
      </Button>
      <Button
        title={t('label.universal-instantiation')}
        disabled={rules[Rule.UniversalInstantiation] === undefined}
        onClick={() => { onRule(Rule.UniversalInstantiation) }}
      >
        {t('label.universal-instantiation-abbreviated')}
      </Button>
      <Button
        title={t('label.universal-generalization')}
        disabled={rules[Rule.UniversalGeneralization] === undefined}
        onClick={() => { onRule(Rule.UniversalGeneralization) }}
      >
        {t('label.universal-generalization-abbreviated')}
      </Button>
      <Button
        title={t('label.existential-instantiation')}
        disabled={rules[Rule.ExistentialInstantiation] === undefined}
        onClick={() => { onRule(Rule.ExistentialInstantiation) }}
      >
        {t('label.existential-instantiation-abbreviated')}
      </Button>
      <Button
        title={t('label.existential-generalization')}
        disabled={rules[Rule.ExistentialGeneralization] === undefined}
        onClick={() => { onRule(Rule.ExistentialGeneralization) }}
      >
        {t('label.existential-generalization-abbreviated')}
      </Button>
    </div>
  )
}
