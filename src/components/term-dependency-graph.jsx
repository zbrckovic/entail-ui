import { SymPresentationCtx } from 'contexts'
import cytoscape from 'cytoscape'
import { useTheme } from 'emotion-theming'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import { Box } from 'rebass'

export const TermDependencyGraph = ({ graph, ...props }) => {
  const theme = useTheme()
  const [cy, setCy] = useState()

  // initialize cytoscape when DOM container becomes available for the first time
  const refCallback = useCallback(node => {
    if (node !== null) {
      const newCy = cytoscape({ container: node })
      setCy(newCy)
    }
  }, [])

  const createElements = useElementsFactory()

  useEffect(() => {
    if (cy !== undefined) {
      const oldElements = cy.elements()
      oldElements.remove()
      const newElements = createElements(graph)
      cy.add(newElements)
      cy.layout({ name: 'klay' }).run()
    }
  }, [cy, graph, createElements])

  useEffect(() => {
    if (cy !== undefined) {
      cy
        .style()
        .resetToDefault()
        .selector('node')
        .style({
          shape: 'round-rectangle',
          width: 20,
          height: 20,
          label: 'data(text)',
          'text-halign': 'center',
          'text-valign': 'center'
        })
        .selector('.dependent')
        .style({
          color: theme.colors.onPrimary,
          'background-color': theme.colors.primary
        })
        .selector('.dependency')
        .style({
          color: theme.colors.onNeutral,
          'background-color': theme.colors.neutral
        })
        .selector('edge')
        .style({
          width: 1,
          'line-color': theme.colors.primary,
          'curve-style': 'bezier',
          'target-arrow-color': theme.colors.primary,
          'target-arrow-shape': 'triangle'
        })
        .update()
    }
  }, [cy, theme])

  return <Box
    height={400}
    width={400}
    ref={refCallback}
    sx={{
      borderWidth: 1,
      borderColor: 'neutral',
      borderStyle: 'solid',
      borderRadius: 1
    }}
    {...props}
  >
  </Box>
}

const useElementsFactory = () => {
  const { createDependencyNode, createDependentNode } = useNodeFactories()

  return ({ dependencies }) => {
    const elements = []

    dependencies.keySeq().forEach(dependentTerm => {
      elements.push(createDependentNode(dependentTerm))
    })

    dependencies.forEach((dependencyTerms, dependentTerm) => {
      dependencyTerms.forEach(dependencyTerm => {
        if (!dependencies.has(dependencyTerm)) {
          elements.push(createDependencyNode(dependencyTerm))
        }

        elements.push(createEdge(dependentTerm, dependencyTerm))
      })
    })

    console.log(elements)

    return elements
  }
}

const useNodeFactories = () => {
  const presentationCtx = useContext(SymPresentationCtx)

  const createNode = sym => {
    const { ascii: { text } } = presentationCtx.get(sym)

    return {
      group: 'nodes',
      grabbable: false,
      data: { id: `${sym.id}`, text }
    }
  }

  return {
    createDependencyNode: sym => ({ ...createNode(sym), classes: ['dependency'] }),
    createDependentNode: sym => ({ ...createNode(sym), classes: ['dependent'] })
  }
}

const createEdge = (symFrom, symTo) => ({
  group: 'edges',
  data: {
    id: `${symFrom.id} -> ${symTo.id}`,
    source: `${symFrom.id}`,
    target: `${symTo.id}`
  }
})
