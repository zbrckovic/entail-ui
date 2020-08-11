import { RootCtx } from 'contexts'
import { ActivityStatus } from 'misc'
import React, { useContext } from 'react'
import { Routes } from 'routes'

export const App = ({ className }) => {
  const { initializationStatus } = useContext(RootCtx)
  const loading = initializationStatus === ActivityStatus.InProgress

  return (
    <div className={className}>
      {loading ? <div>spinner</div> : <Routes/>}
    </div>
  )
}
