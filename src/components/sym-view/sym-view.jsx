import React from 'react'

export const SymView = ({ sym, presentation }) => {
  return (
    <div>
      <div>{sym.toString()}</div>
      <div>{presentation.toString()}</div>
    </div>
  )
}
