import React, { useMemo } from 'react'
import { SymView } from '../sym-view'

export const SymPresentationCtxView = ({ symPresentationCtx }) => {
  const entries = useMemo(
    () => symPresentationCtx
      .sort((first, second) => first.id - second.id)
      .entrySeq()
      .toList(),
    [symPresentationCtx]
  )

  return (
    <div> {
      entries.map(([sym, presentation]) => (
        <SymView key={sym.id} sym={sym} presentation={presentation}/>
      ))
    }
    </div>
  )
}
