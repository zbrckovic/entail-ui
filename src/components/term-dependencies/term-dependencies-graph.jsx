import { Direction, MAX_ZOOM, MIN_ZOOM } from './term-dependencies-graph-common'
import React, { useRef, useState } from 'react'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import { useTranslation } from 'react-i18next'
import { TermDependenciesGraphCanvas } from './term-dependencies-graph-canvas'
import { IconButton } from '@material-ui/core'
import ReplayIcon from '@material-ui/icons/Replay'
import ZoomInIcon from '@material-ui/icons/ZoomIn'
import ZoomOutIcon from '@material-ui/icons/ZoomOut'
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward'
import ArrowForwardIcon from '@material-ui/icons/ArrowForward'
import ZoomOutMapIcon from '@material-ui/icons/ZoomOutMap'
import CenterFocusStrongIcon from '@material-ui/icons/CenterFocusStrong'
import Box from '@material-ui/core/Box'
import Paper from '@material-ui/core/Paper'

export const TermDependenciesGraph = ({ graph, ...props }) => {
  const theme = useTheme()
  const classes = useStyles(theme)

  const { t } = useTranslation('TermDependencies')
  const canvasRef = useRef()

  const [zoom, setZoom] = useState()
  const [direction, setDirection] = useState(Direction.DOWN)

  return <Box display='flex' flexDirection='column' alignItems='stretch' {...props}>
    <Box display='flex' justifyContent='space-between'>
      <Box>
        <IconButton title={t('button.reset')} onClick={() => { canvasRef.current.reset() }}>
          <ReplayIcon />
        </IconButton>
        <IconButton title={t('button.fit')} onClick={() => { canvasRef.current.fit() }}>
          <ZoomOutMapIcon />
        </IconButton>
        <IconButton title={t('button.center')} onClick={() => { canvasRef.current.center() }}>
          <CenterFocusStrongIcon />
        </IconButton>
        <IconButton
          title={
            direction === Direction.DOWN
              ? t('button.plotHorizontally')
              : t('button.plotVertically')
          }
          onClick={() => {
            setDirection(direction === Direction.DOWN ? Direction.RIGHT : Direction.DOWN)
          }}
        >
          {direction === Direction.DOWN ? <ArrowForwardIcon /> : <ArrowDownwardIcon />}
        </IconButton>
      </Box>
      <Box>
        <IconButton
          disabled={zoom === MIN_ZOOM}
          title={t('button.zoomOut')}
          onClick={() => {
            canvasRef.current.zoomOut()
          }}
        >
          <ZoomOutIcon />
        </IconButton>
        <IconButton
          disabled={zoom === MAX_ZOOM}
          title={t('button.zoomIn')}
          onClick={() => {
            canvasRef.current.zoomIn()
          }}
        >
          <ZoomInIcon />
        </IconButton>
      </Box>
    </Box>
    <Paper className={classes.paper}>
      <TermDependenciesGraphCanvas
        graph={graph}
        onZoomChange={setZoom}
        direction={direction}
        ref={canvasRef}
        {...props}
      />
    </Paper>
  </Box>
}

const useStyles = makeStyles({
  paper: {
    flexGrow: 1,
    padding: ({ spacing }) => spacing(1)
  }
})
