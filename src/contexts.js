import { createContext } from 'react'

export const RootCtx = createContext(undefined)

export const SymCtx = createContext({
  syms: {},
  presentations: {}
})

export const SymCtxUtil = {
  // Deletes all symbols from `symCtx` not occurring in `allowedSyms`.
  deleteExtraSymsFromSymCtx (symCtx, allowedSyms) {
    let newCtx = symCtx

    Object.keys(symCtx.syms).forEach(sym => {
      if (allowedSyms[sym] === undefined) {
        newCtx = this.deleteSymFromSymCtx(newCtx, sym)
      }
    })

    return newCtx
  },

  // Deletes `sym` from both `symCtx.syms` and `symCtx.presentations`.
  deleteSymFromSymCtx (symCtx, sym) {
    const { syms, presentations } = symCtx

    const newSyms = { ...syms }
    const newPresentations = { ...presentations }

    delete newSyms[sym]
    delete newPresentations[sym]

    return { syms: newSyms, presentations: newPresentations }
  }

}


