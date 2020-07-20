import { environment } from 'environment'
import React from 'react'
import { RootCtx } from 'contexts/root-ctx'

export const RootWrapper = ({ children }) => (
  <RootCtx.Provider value={{ environment }}>
    {children}
  </RootCtx.Provider>
)
