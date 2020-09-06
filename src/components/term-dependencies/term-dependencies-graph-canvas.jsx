import { MAX_ZOOM, MIN_ZOOM } from './term-dependencies-graph-common'
import { SymPresentationCtx } from 'contexts'
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

const createGraphStyles = theme => {
  console.log(theme)
  return ({
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
}
