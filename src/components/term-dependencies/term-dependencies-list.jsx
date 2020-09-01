import { SymPresentationCtx } from 'contexts'
import React, { useContext } from 'react'
import { Box, Text } from 'rebass'

export const TermDependenciesList = ({ graph: { dependencies }, sx, ...props }) => {
  const presentationCtx = useContext(SymPresentationCtx)

  return <Box as='ul' sx={{ ...sx }} {...props}>
    {dependencies
      .entrySeq()
      .map(([dependentTerm, dependenciesTerms]) =>
        <Box as='li' key={`${dependentTerm.id}`}>
          <Text>{presentationCtx.get(dependentTerm).ascii.text}</Text>
          {!dependenciesTerms.isEmpty() &&
          <Box as='ul'>
            {dependenciesTerms
              .keySeq()
              .map(dependencyTerm => (
                <Box as='li' key={dependencyTerm.id}>
                  <Text>{presentationCtx.get(dependencyTerm).ascii.text}</Text>
                </Box>
              ))
              .toArray()
            }
          </Box>}
        </Box>)
      .toArray()}
  </Box>
}
