import { TermDependenciesList } from 'components/term-dependencies/term-dependencies-list'
import { Button } from 'components/ui-toolkit/button'
import { faList, faProjectDiagram } from '@fortawesome/free-solid-svg-icons'
import { useTranslation } from 'react-i18next'
import { TermDependenciesGraph } from './term-dependencies-graph'
import React, { useState } from 'react'
import { Flex, Text } from 'rebass'

export const TermDependencies = ({ graph, sx, ...props }) => {
  const { t } = useTranslation('TermDependencies')
  const [mode, setMode] = useState(Mode.GRAPH)

  return <Flex
    flexDirection='column'
    alignItems='stretch'
    sx={{ ...sx }}
    {...props}>
    <Flex
      alignItems='baseline'
      flexGrow={0}
      pb={1}
      mb={1}
      sx={{
        borderBottomWidth: 1,
        borderBottomStyle: 'solid',
        borderBottomColor: 'neutral'
      }}>
      <Text flexGrow={1}>{t('label.termDependencies')}</Text>
      <Button
        title={mode === Mode.GRAPH ? t('button.list') : t('button.graph')}
        icon={mode === Mode.GRAPH ? faList : faProjectDiagram}
        onClick={() => { setMode(mode === Mode.LIST ? Mode.GRAPH : Mode.LIST) }}
      />
    </Flex>
    {mode === Mode.LIST
      ? <TermDependenciesList flexGrow={1} graph={graph} />
      : <TermDependenciesGraph flexGrow={1} graph={graph} />
    }
  </Flex>
}

const Mode = {
  LIST: 'LIST',
  GRAPH: 'GRAPH'
}
