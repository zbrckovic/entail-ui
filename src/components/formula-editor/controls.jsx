import { useTranslation } from 'react-i18next'
import {
  conjunction,
  disjunction,
  equivalence, existentialQuantifier,
  implication,
  negation, primitivePresentations, SymPresentation, universalQuantifier
} from '@zbrckovic/entail-core'
import Box from '@material-ui/core/Box'
import { Button, ButtonGroup } from '@material-ui/core'
import CheckIcon from '@material-ui/icons/Check'
import CloseIcon from '@material-ui/icons/Close'
import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

export const Controls = ({ onSymbol, onSubmit, onCancel, isSubmitDisabled }) => {
  const { t } = useTranslation('FormulaEditor')
  const classes = useStyles()

  return (
    <Box display='flex' justifyContent='space-between'>
      <ButtonGroup className={classes.symbols}>
        {
          primitiveSyms.map(({ id }) => {
            const presentation = primitivePresentations[id]

            const displayText = SymPresentation.getDefaultSyntacticInfo(presentation).text
            const text = presentation.ascii.text

            return (
              <Button
                className={classes.symbolButton}
                key={id}
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
          color='primary'
          title={t('button.submit')}
          onClick={() => { onSubmit() }}
          disabled={isSubmitDisabled}
          startIcon={<CheckIcon />}
        >
          {t('button.submit')}
        </Button>
        <Button
          title={t('button.cancel')}
          onClick={() => { onCancel() }}
          startIcon={<CloseIcon />}
        >
          {t('button.cancel')}
        </Button>
      </ButtonGroup>
    </Box>
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

const useStyles = makeStyles(theme => ({
  symbols: {
    marginRight: theme.spacing(1)
  },
  symbolButton: {
    fontFamily: theme.typography.mono
  }
}))
