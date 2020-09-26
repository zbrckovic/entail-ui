import { MAX_ZOOM, MIN_ZOOM } from './term-dependencies-graph-common'
import { SymCtx } from 'contexts'
import cytoscape from 'cytoscape'
import React, {
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useImperativeHandle,
  useState
} from 'react'
import useTheme from '@material-ui/core/styles/useTheme'
import Box from '@material-ui/core/Box'

export const TermDependenciesGraphCanvas = forwardRef(({
  graph,
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

  return <Box height='100%' ref={refCallback} {...props} />
})

const useElementsFactory = () => {
  const { createDependencyNode, createDependentNode } = useNodeFactories()

  return graph => {
    const elements = []

    const dependentNodes = Object
      .keys(graph)
      .map(id => parseInt(id, 10))
      .map(createDependentNode)

    elements.push(...dependentNodes)

    const traversedDependencies = new Set()

    Object.entries(graph).forEach(([dependent, dependencies]) => {
      dependencies.forEach(dependency => {
        if (!traversedDependencies.has(dependency)) {
          elements.push(createDependencyNode(dependency))
        }

        console.log(dependent, dependency)
        elements.push(createEdge(dependent, dependency))

        traversedDependencies.add(dependency)
      })
    })

    return elements
  }
}

const useNodeFactories = () => {
  const { presentations } = useContext(SymCtx)

  const createNode = symId => {
    const { ascii: { text } } = presentations[symId]

    return {
      group: 'nodes',
      grabbable: false,
      data: { id: `${symId}`, text }
    }
  }

  return {
    createDependencyNode: symId => ({ ...createNode(symId), classes: ['dependency'] }),
    createDependentNode: symId => ({ ...createNode(symId), classes: ['dependent'] })
  }
}

const createEdge = (symFrom, symTo) => ({
  group: 'edges',
  data: {
    id: `${symFrom} -> ${symTo}`,
    source: `${symFrom}`,
    target: `${symTo}`
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
    'font-family': theme.typography.mono,
    padding: theme.spacing(1)
  },
  edge: {
    width: 1,
    'line-color': theme.palette.primary.main,
    'curve-style': 'bezier',
    'target-arrow-color': theme.palette.primary.main,
    'target-arrow-shape': 'triangle'
  },
  dependent: {
    color: theme.palette.primary.contrastText,
    'background-color': theme.palette.primary.main
  },
  dependency: {
    color: theme.palette.background.paper,
    'background-color': theme.palette.text.primary
  }
})
