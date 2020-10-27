import { Direction, MAX_ZOOM, MIN_ZOOM } from './term-dependencies-graph-common'
import React, { useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { TermDependenciesGraphCanvas } from './term-dependencies-graph-canvas'
import style from './term-dependencies-graph.m.scss'
import classnames from 'classnames'
import { Button } from '@blueprintjs/core'
import { IconNames } from '@blueprintjs/icons'

export const TermDependenciesGraph = ({ graph, className, ...props }) => {
  const { t } = useTranslation('TermDependencies')
  const canvasRef = useRef()

  const [zoom, setZoom] = useState()
  const [direction, setDirection] = useState(Direction.DOWN)

  return <div
    className={classnames(style.root, className)}
    {...props}
  >
    <div className={style.header}>
      <div className={style.controls}>
        <Button
          minimal
          title={t('button.reset')}
          onClick={() => { canvasRef.current.reset() }}
          icon={IconNames.RESET}
        />
        <Button
          minimal
          title={t('button.fit')}
          onClick={() => { canvasRef.current.fit() }}
          icon={IconNames.ZOOM_TO_FIT}
        >
        </Button>
        <Button
          minimal
          title={t('button.center')}
          onClick={() => { canvasRef.current.center() }}
          icon={IconNames.ALIGN_CENTER}
        >
        </Button>
        <Button
          minimal
          title={
            direction === Direction.DOWN
              ? t('button.plotHorizontally')
              : t('button.plotVertically')
          }
          onClick={() => {
            setDirection(direction === Direction.DOWN ? Direction.RIGHT : Direction.DOWN)
          }}
          icon={
            direction === Direction.DOWN ? IconNames.ARROW_RIGHT : IconNames.ARROW_DOWN
          }
        />
      </div>
      <div className={style.controls}>
        <Button
          minimal
          disabled={zoom === MIN_ZOOM}
          title={t('button.zoomOut')}
          onClick={() => { canvasRef.current.zoomOut() }}
          icon={IconNames.ZOOM_OUT}
        />
        <Button
          minimal
          disabled={zoom === MAX_ZOOM}
          title={t('button.zoomIn')}
          onClick={() => { canvasRef.current.zoomIn() }}
          icon={IconNames.ZOOM_IN}
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
