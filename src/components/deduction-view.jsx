import { Steps } from 'components/steps'
import { TermDependencyGraph } from 'components/term-dependency-graph'
import React from 'react'
import { Flex } from 'rebass'

export const DeductionView = ({ deduction, ...props }) =>
  <Flex {...props}>
    <Steps flexBasis={0} flexGrow={1} steps={deduction.steps} />
    <TermDependencyGraph flexBasis={0} flexGrow={1} graph={deduction.termDependencyGraph} />
  </Flex>
