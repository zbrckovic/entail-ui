import {
  faAlignCenter,
  faExpandArrowsAlt,
  faGripHorizontal,
  faGripVertical,
  faSearchMinus,
  faSearchPlus,
  faUndoAlt
} from '@fortawesome/free-solid-svg-icons'
import {
  Direction,
  MAX_ZOOM,
  MIN_ZOOM
} from './term-dependencies-graph-common'
import { Button } from 'components/ui-toolkit/button'
import React, { useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Flex } from 'rebass'
import { TermDependenciesGraphCanvas } from './term-dependencies-graph-canvas'

export const TermDependenciesGraph = ({ graph, sx, ...props }) => {
  const { t } = useTranslation('TermDependencies')
  const canvasRef = useRef()

  const [zoom, setZoom] = useState()
  const [direction, setDirection] = useState(Direction.DOWN)

  return <Flex
    flexDirection='column'
    alignItems='stretch'
    sx={{ ...sx }}
    {...props}>
    <Flex>
      <Button
        minimal
        flexBasis={48}
        flexGrow={1}
        title={t('button.reset')}
        icon={faUndoAlt}
        onClick={() => {
          canvasRef.current.reset()
        }} />
      <Button
        minimal
        flexBasis={48}
        flexGrow={1}
        title={t('button.fit')}
        icon={faExpandArrowsAlt}
        onClick={() => {
          canvasRef.current.fit()
        }} />
      <Button
        minimal
        flexBasis={48}
        flexGrow={1}
        title={t('button.center')}
        icon={faAlignCenter}
        onClick={() => {
          canvasRef.current.center()
        }} />
      <Button
        minimal
        flexBasis={48}
        flexGrow={1}
        title={
          direction === Direction.DOWN
            ? t('button.plotHorizontally')
            : t('button.plotVertically')
        }
        icon={direction === Direction.DOWN ? faGripHorizontal : faGripVertical}
        onClick={() => {
          setDirection(direction === Direction.DOWN ? Direction.RIGHT : Direction.DOWN)
        }} />
      <Button
        minimal
        flexBasis={48}
        flexGrow={1}
        disabled={zoom === MIN_ZOOM}
        title={t('button.zoomOut')}
        icon={faSearchMinus}
        onClick={() => {
          canvasRef.current.zoomOut()
        }} />
      <Button
        minimal
        flexBasis={48}
        flexGrow={1}
        disabled={zoom === MAX_ZOOM}
        title={t('button.zoomIn')}
        icon={faSearchPlus}
        onClick={() => {
          canvasRef.current.zoomIn()
        }} />
    </Flex>
    <TermDependenciesGraphCanvas
      flexGrow={1}
      ref={canvasRef}
      graph={graph}
      onZoomChange={setZoom}
      direction={direction}
      {...props}
    />
  </Flex>
}
