import { createContext } from 'react'

export const RootCtx = createContext(undefined)

export const SymCtx = createContext({
  syms: {},
  presentations: {}
})
