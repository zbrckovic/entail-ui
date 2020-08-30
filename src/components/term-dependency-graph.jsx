import { SymPresentationCtx } from 'contexts'
import cytoscape from 'cytoscape'
import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { Box } from 'rebass'

export const TermDependencyGraph = ({ initialGraph, ...props }) => {
  const [cyContainer, setCyContainer] = useState(null)
  const [cy, setCy] = useState()

  useEffect(() => {
    if (cyContainer !== null) {
      setCy((cytoscape({ container: cyContainer })))
    }
  }, [cyContainer])

  const createElements = useCytoscapeElementsFactory()
  const cyElements = useMemo(() => createElements(initialGraph), [createElements, initialGraph])

  useEffect(() => {
    if (cy !== undefined) {
      console.log(cy)
      console.log(cyElements)
      cy.add(cyElements)
      cy.layout({ name: 'klay' }).run()
    }
  }, [cy, cyElements])

  const refCallback = useCallback(node => {
    if (node !== null) setCyContainer(node)
  }, [])

  return <Box
    height={1000}
    width={1000}
    ref={refCallback}
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
