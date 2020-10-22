// Deletes all symbols from `symCtx` not occurring in `allowedSyms`.
export const deleteExtraSymsFromSymCtx = (symCtx, allowedSyms) => {
  let newCtx = symCtx

  Object.keys(symCtx.syms).forEach(sym => {
    if (allowedSyms[sym] === undefined) {
      console.log(`deleting sym: ${sym}`)
      newCtx = deleteSymFromSymCtx(newCtx, sym)
    }
  })

  return newCtx
}

// Deletes `sym` from both `symCtx.syms` and `symCtx.presentations`.
const deleteSymFromSymCtx = (symCtx, sym) => {
  const { syms, presentations } = symCtx

  const newSyms = { ...syms }
  const newPresentations = { ...presentations }

  delete newSyms[sym]
  delete newPresentations[sym]

  return { syms: newSyms, presentations: newPresentations }
}
