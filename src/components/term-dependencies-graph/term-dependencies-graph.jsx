import {
  faAlignCenter,
  faExpandArrowsAlt,
  faGripHorizontal,
  faGripVertical,
  faSearchMinus,
  faSearchPlus,
  faUndoAlt,
} from '@fortawesome/free-solid-svg-icons'
import {
  Direction,
  MAX_ZOOM,
  MIN_ZOOM
} from 'components/term-dependencies-graph/term-dependencies-graph-common'
import { Button } from 'components/ui-toolkit/button'
import React, { useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Box, Flex } from 'rebass'
import { TermDependenciesGraphCanvas } from './term-dependencies-graph-canvas'

export const TermDependenciesGraph = ({ graph, ...props }) => {
  const { t } = useTranslation('TermDependenciesGraph')
  const canvasRef = useRef()

  const [zoom, setZoom] = useState()
  const [direction, setDirection] = useState(Direction.DOWN)

  return <Box>
    <Flex mb={1}>
      <Button
        mr={2}
        title={t('button.reset')}
        icon={faUndoAlt}
        onClick={() => {
          canvasRef.current.reset()
        }} />
      <Button
        mr={2}
        title={t('button.fit')}
        icon={faExpandArrowsAlt}
        onClick={() => {
          canvasRef.current.fit()
        }} />
      <Button
        mr={2}
        title={t('button.center')}
        icon={faAlignCenter}
        onClick={() => {
          canvasRef.current.center()
        }} />
      <Button
        mr={2}
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
        mr={2}
        disabled={zoom === MIN_ZOOM}
        title={t('button.zoomOut')}
        icon={faSearchMinus}
        onClick={() => {
          canvasRef.current.zoomOut()
        }} />
      <Button
        mr={2}
        disabled={zoom === MAX_ZOOM}
        title={t('button.zoomIn')}
        icon={faSearchPlus}
        onClick={() => {
          canvasRef.current.zoomIn()
        }} />
    </Flex>
    <TermDependenciesGraphCanvas
      ref={canvasRef}
      graph={graph}
      onZoomChange={setZoom}
      direction={direction}
      {...props}
    />
  </Box>
}
