import { SymPresentationCtx } from 'contexts'
import React, { useContext, useMemo } from 'react'
import { Text } from 'rebass'

export const TermDependenciesText = ({ graph: { dependencies }, sx, ...props }) => {
  const presentationCtx = useContext(SymPresentationCtx)

  const text = useMemo(() => {
    const getText = sym => presentationCtx.get(sym).getDefaultSyntacticInfo().text

    const createLine = (dependent, dependencies) => {
      let text = getText(dependent)

      if (!dependencies.isEmpty()) {
        text += `: ${dependencies.map(getText).join(', ')}`
      }

      return text
    }

    return dependencies
      .entrySeq()
      .map(([dependentTerm, dependenciesTerms]) => createLine(dependentTerm, dependenciesTerms))
      .join('\n')
  }, [presentationCtx, dependencies])

  return <Text
    as='pre'
    fontFamily='mono'
    sx={{
      px: 2,
      py: 1,
      bg: 'surface',
      borderWidth: 1,
      borderColor: 'neutral',
      borderStyle: 'solid',
      borderRadius: 1,
      ...sx
    }}
    {...props}
  >{text}</Text>
}
