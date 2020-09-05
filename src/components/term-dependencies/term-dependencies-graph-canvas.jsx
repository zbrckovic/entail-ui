import {
  MAX_ZOOM,
  MIN_ZOOM
} from './term-dependencies-graph-common'
import { SymPresentationCtx } from 'contexts'
import cytoscape from 'cytoscape'
import { useTheme } from 'emotion-theming'
import React, {
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useImperativeHandle,
  useState
} from 'react'
import { Box } from 'rebass'

export const TermDependenciesGraphCanvas = forwardRef(({
  graph,
  sx,
  onZoomChange,
  direction,
  ...props
}, ref) => {
  const theme = useTheme()
  const [cy, setCy] = useState()

  useImperativeHandle(ref, () => ({
    reset: () => { cy?.reset() },
    fit: () => { cy?.fit() },
    zoomIn: () => {
      if (cy !== undefined) {
        cy.zoom(Math.floor(cy.zoom()) + 1)
      }
    },
    zoomOut: () => {
      if (cy !== undefined) {
        cy.zoom(Math.floor(cy.zoom()) - 1)
      }
    },
    center: () => {
      cy?.center()
    }
  }), [cy])

  // initialize cytoscape when DOM container becomes available for the first time
  const refCallback = useCallback(node => {
    if (node !== null) {
      const newCy = cytoscape({
        container: node,
        minZoom: MIN_ZOOM,
        maxZoom: MAX_ZOOM
      })
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
      cy.layout({ name: 'klay', fit: false, klay: { direction } }).run()
    }
  }, [cy, graph, createElements, direction])

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

      if (onZoomChange !== undefined) {
        let zoom = cy.zoom()
        onZoomChange(zoom)
        cy.on('viewport', () => {
          if (zoom !== cy.zoom()) {
            zoom = cy.zoom()
            onZoomChange(zoom)
          }
        })
      }

      return () => { cy.removeAllListeners() }
    }
  }, [cy, theme, onZoomChange])

  return <Box
    bg='surface'
    ref={refCallback}
    sx={{
      borderWidth: 1,
      borderColor: 'inputBorder',
      borderStyle: 'solid',
      borderRadius: 1,
      ...sx
    }}
    {...props}
  >
  </Box>
})

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
    shape: 'rectangle',
    width: 20,
    height: 20,
    label: 'data(text)',
    'text-halign': 'center',
    'text-valign': 'center',
    'font-family': theme.fonts.mono,
    padding: theme.space[0],
    'font-size': theme.fontSizes.small
  },
  edge: {
    width: 1,
    'line-color': theme.colors.primaryBtnBg,
    'curve-style': 'bezier',
    'target-arrow-color': theme.colors.primaryBtnBg,
    'target-arrow-shape': 'triangle'
  },
  dependent: {
    color: theme.colors.primaryBtnFg,
    'background-color': theme.colors.primaryBtnBg
  },
  dependency: {
    color: theme.colors.neutralBtnFg,
    'background-color': theme.colors.neutralBtnBg
  }
})
