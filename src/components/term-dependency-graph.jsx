import { SymPresentationCtx } from 'contexts'
import cytoscape from 'cytoscape'
import React, { useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { Box } from 'rebass'

export const TermDependencyGraph = ({ initialGraph, ...props }) => {
  const [cy, setCy] = useState()
  const initialGraphRef = useRef(initialGraph)

  // initialize cytoscape when DOM container becomes available for the first time
  const refCallback = useCallback(node => {
    if (node !== null) {
      const newCy = cytoscape({ container: node })
      setCy(newCy)
    }
  }, [])

  const createElements = useCytoscapeElementsFactory()
  const cyElements = useMemo(() => createElements(initialGraphRef.current), [createElements])

  useEffect(() => {
    if (cy !== undefined) {
      cy.add(cyElements)
      cy.layout({ name: 'klay' }).run()
    }
  }, [cy, cyElements])

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

const useCytoscapeElementsFactory = () => {
  const createNode = useCytoscapeNodeFactory()

  return ({ dependencies }) => {
    const elements = []

    dependencies.forEach((dependencies, dependent) => {
      elements.push(createNode(dependent))

      dependencies.forEach(dependency => {
        elements.push(createNode(dependency))
        elements.push(createEdge(dependent, dependency))
      })
    })

    return elements
  }
}

const useCytoscapeNodeFactory = () => {
  const presentationCtx = useContext(SymPresentationCtx)

  return sym => {
    const { ascii: { text } } = presentationCtx.get(sym)
    return {
      group: 'nodes',
      grabbable: false,
      data: { id: `${sym.id}`, text }
    }
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
