import React, { useMemo, useState } from 'react'
import style from './rules.module.scss'
import { Button, Dialog } from '@blueprintjs/core'
import { useTranslation } from 'react-i18next'
import { Rule } from '@zbrckovic/entail-core/lib/deduction-structure/rule'

export const Rules = ({ rules = {}, onRuleApplied }) => {
  const { t } = useTranslation('Rules')

  const [selectedRule, setSelectedRule] = useState()

  const dialog = useMemo(() => {
    switch (selectedRule) {
      case Rule.Premise:
        return <div>Premise</div>
      case Rule.TautologicalImplication:
        return <div>Tautological Implication</div>
      case Rule.Theorem:
        return <div>Theorem</div>
      case Rule.UniversalInstantiation:
        return <div>Theorem</div>
      case Rule.UniversalGeneralization:
        return <div>Theorem</div>
      case Rule.ExistentialInstantiation:
        return <div>Theorem</div>
      case Rule.ExistentialGeneralization:
        return <div>Theorem</div>
    }
  }, [selectedRule])

  return <>
    <div className={style.container}>
      <Button
        title={t('label.premise')}
        disabled={rules[Rule.Premise] === undefined}
        onClick={() => { setSelectedRule(Rule.Premise) }}
      >
        {t('label.premise-abbreviated')}
      </Button>
      <Button
        title={t('label.tautological-implication')}
        disabled={rules[Rule.TautologicalImplication] === undefined}
        onClick={() => { setSelectedRule(Rule.TautologicalImplication) }}
      >
        {t('label.tautological-implication-abbreviated')}
      </Button>
      <Button
        title={t('label.deduction')}
        disabled={rules[Rule.Deduction] === undefined}
        onClick={() => { onRuleApplied(rules[Rule.Deduction].apply()) }}
      >
        {t('label.deduction-abbreviated')}
      </Button>
      <Button
        title={t('label.theorem')}
        disabled={rules[Rule.Theorem] === undefined}
        onClick={() => { setSelectedRule(Rule.Theorem) }}
      >
        {t('label.theorem-abbreviated')}
      </Button>
      <Button
        title={t('label.universal-instantiation')}
        disabled={rules[Rule.UniversalInstantiation] === undefined}
        onClick={() => { setSelectedRule(Rule.UniversalInstantiation) }}
      >
        {t('label.universal-instantiation-abbreviated')}
      </Button>
      <Button
        title={t('label.universal-generalization')}
        disabled={rules[Rule.UniversalGeneralization] === undefined}
        onClick={() => { setSelectedRule(Rule.UniversalGeneralization) }}
      >
        {t('label.universal-generalization-abbreviated')}
      </Button>
      <Button
        title={t('label.existential-instantiation')}
        disabled={rules[Rule.ExistentialInstantiation] === undefined}
        onClick={() => { setSelectedRule(Rule.ExistentialInstantiation) }}
      >
        {t('label.existential-instantiation-abbreviated')}
      </Button>
      <Button
        title={t('label.existential-generalization')}
        disabled={rules[Rule.ExistentialGeneralization] === undefined}
        onClick={() => { setSelectedRule(Rule.ExistentialGeneralization) }}
      >
        {t('label.existential-generalization-abbreviated')}
      </Button>
    </div>
    <Dialog
      isOpen={dialog !== undefined}
      onClose={() => { setSelectedRule(undefined) }}
    >
      {dialog}
    </Dialog>
  </>
}
