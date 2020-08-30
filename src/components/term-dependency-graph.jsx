import { SymPresentationCtx } from 'contexts'
import cytoscape from 'cytoscape'
import { useTheme } from 'emotion-theming'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import { Box } from 'rebass'

export const TermDependencyGraph = ({ graph, sx, ...props }) => {
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
      cy.layout(klayLayoutOptions).run()
    }
  }, [cy, graph, createElements])

  useEffect(() => {
    if (cy !== undefined) {
      const styles = createGraphStyles(theme)

      cy
        .style()
        .resetToDefault()
        .selector('node')
        .style(styles.node)
        .selector('.dependent')
        .style(styles.dependent)
        .selector('.dependency')
        .style(styles.dependency)
        .selector('edge')
        .style(styles.edge)
        .update()
    }
  }, [cy, theme])

  return <Box
    bg='surface'
    ref={refCallback}
    sx={{
      borderWidth: 1,
      borderColor: 'neutral',
      borderStyle: 'solid',
      borderRadius: 1,
      ...sx
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

const createGraphStyles = theme => ({
  node: {
    shape: 'round-rectangle',
    width: 20,
    height: 20,
    label: 'data(text)',
    'text-halign': 'center',
    'text-valign': 'center'
  },
  edge: {
    width: 1,
    'line-color': theme.colors.primary,
    'curve-style': 'bezier',
    'target-arrow-color': theme.colors.primary,
    'target-arrow-shape': 'triangle'
  },
  dependent: {
    color: theme.colors.onPrimary,
    'background-color': theme.colors.primary
  },
  dependency: {
    color: theme.colors.onNeutral,
    'background-color': theme.colors.neutral
  }
})

const klayLayoutOptions = {
  name: 'klay',
  fit: false,
  klay: {
    direction: 'DOWN'
  }
}
