import { Rule } from '@zbrckovic/entail-core'
import { useRuleDescriber } from 'hooks'
import React from 'react'
import { useTranslation } from 'react-i18next'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'
import { Typography } from '@material-ui/core'

export const DeductionEditorRulePicker = ({
  rules = {},
  selectedRule,
  onRuleSelect,
  onRuleDeselect
}) => {
  const classes = useStyles()

  const ruleDescriber = useRuleDescriber()
  const { t } = useTranslation('DeductionEditor')

  return (
    <Box>
      <Typography component='label'>{t('label.rules')}</Typography>
      <Box className={classes.buttons}>
        {
          allRules.map(rule => {
            const { translation, abbreviation } = ruleDescriber(rule)
            const selected = selectedRule === rule

            return (
              <Button
                key={rule}
                title={translation}
                disabled={!rules.has(rule)}
                variant='outlined'
                onClick={() => {
                  if (selected) {
                    onRuleDeselect()
                  } else {
                    onRuleSelect(rule)
                  }
                }}>
                {abbreviation}
              </Button>
            )
          })
        }
      </Box>
    </Box>
  )
}

const useStyles = makeStyles(theme => ({
  buttons: {
    display: 'grid',
    gridTemplateColumns: 'min-content min-content',
    gridGap: theme.spacing(1)
  }
}))

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
