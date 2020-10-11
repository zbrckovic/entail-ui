import { RootCtx } from 'contexts'
import { ActivityStatus } from 'misc/activity-status'
import React, { useContext } from 'react'
import { Routes } from 'Routes'

export const App = ({ className }) => {
  const { initializationStatus } = useContext(RootCtx)
  const loading = initializationStatus === ActivityStatus.InProgress

  return (
    <div className={className}>
      {loading ? <div>spinner</div> : <Routes />}
    </div>
  )
}
