import { TermDependenciesText } from './term-dependencies-text'
import ListIcon from '@material-ui/icons/List'
import { useTranslation } from 'react-i18next'
import { TermDependenciesGraph } from './term-dependencies-graph'
import React, { useState } from 'react'
import Box from '@material-ui/core/Box'
import { IconButton, Typography } from '@material-ui/core'
import AccountTreeIcon from '@material-ui/icons/AccountTree'

export const TermDependencies = ({ graph, ...props }) => {
  const { t } = useTranslation('TermDependencies')
  const [mode, setMode] = useState(Mode.GRAPH)

  return <Box display='flex' flexDirection='column' {...props}>
    <Box display='flex' justifyContent='space-between' alignItems='center'>
      <Typography variant='subtitle1'>
        {t('label.termDependencies')}
      </Typography>
      <IconButton
        title={mode === Mode.GRAPH ? t('button.list') : t('button.graph')}
        onClick={() => { setMode(mode === Mode.LIST ? Mode.GRAPH : Mode.LIST) }}
      >{mode === Mode.GRAPH ? <ListIcon /> : <AccountTreeIcon />}</IconButton>
    </Box>
    {mode === Mode.LIST
      ? <TermDependenciesText flexGrow={1} graph={graph} />
      : <TermDependenciesGraph flexGrow={1} graph={graph} />
    }
  </Box>
}

const Mode = {
  LIST: 'LIST',
  GRAPH: 'GRAPH'
}
