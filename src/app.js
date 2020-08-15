import { RootCtx } from 'contexts'
import { ActivityStatus } from 'misc/activity-status'
import React, { useContext } from 'react'
import { Box } from 'rebass'
import { Routes } from 'Routes'

export const App = ({ className }) => {
  const { initializationStatus } = useContext(RootCtx)
  const loading = initializationStatus === ActivityStatus.InProgress

  return (
    <Box className={className}>
      {loading ? <Box>spinner</Box> : <Routes/>}
    </Box>
  )
}
