import { Direction, MAX_ZOOM, MIN_ZOOM } from './term-dependencies-graph-common'
import React, { useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { TermDependenciesGraphCanvas } from './term-dependencies-graph-canvas'
import style from './term-dependencies-graph.m.scss'
import classnames from 'classnames'
import { Button } from '@blueprintjs/core'

export const TermDependenciesGraph = ({ graph, className, ...props }) => {
  const { t } = useTranslation('TermDependencies')
  const canvasRef = useRef()

  const [zoom, setZoom] = useState()
  const [direction, setDirection] = useState(Direction.DOWN)

  return <div
    className={classnames(style.root, className)}
    {...props}
  >
    <div>
      <div>
        <Button title={t('button.reset')} onClick={() => { canvasRef.current.reset() }} />
        <Button title={t('button.fit')} onClick={() => { canvasRef.current.fit() }}>
        </Button>
        <Button title={t('button.center')} onClick={() => { canvasRef.current.center() }}>
        </Button>
        <Button
          title={
            direction === Direction.DOWN
              ? t('button.plotHorizontally')
              : t('button.plotVertically')
          }
          onClick={() => {
            setDirection(direction === Direction.DOWN ? Direction.RIGHT : Direction.DOWN)
          }}
        />
      </div>
      <div>
        <Button
          disabled={zoom === MIN_ZOOM}
          title={t('button.zoomOut')}
          onClick={() => { canvasRef.current.zoomOut() }}
        />
        <Button
          disabled={zoom === MAX_ZOOM}
          title={t('button.zoomIn')}
          onClick={() => { canvasRef.current.zoomIn() }}
        />
      </div>
    </div>
    <div className={style.graph}>
      <TermDependenciesGraphCanvas
        graph={graph}
        onZoomChange={setZoom}
        direction={direction}
        ref={canvasRef}
        {...props}
      />
    </div>
  </div>
}
