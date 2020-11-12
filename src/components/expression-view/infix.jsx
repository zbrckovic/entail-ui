import React from 'react'
import { ExpressionView } from './expression-view'
import { ExpressionText, TargetType } from './expression-text'

export const Infix = ({
  sym,
  symText,
  childExpression1,
  childExpression2,
  root,
  selectionTarget,
  onSelectionTargetChange
}) => {
  const isSelected = selectionTarget?.position.length === 0

  let selectionTargetForChild1
  let selectionTargetForChild2
  if (!isSelected && selectionTarget !== undefined) {
    const { type, position: [firstIndex, ...restIndexes] } = selectionTarget

    const selectionTargetForChild = { type, position: restIndexes }

    if (firstIndex === 0) {
      selectionTargetForChild1 = selectionTargetForChild
    } else if (firstIndex === 1) {
      selectionTargetForChild2 = selectionTargetForChild
    }
  }

  return <>
    {root || <ExpressionText text="(" kind={sym.kind}/>}
    <ExpressionView
      expression={childExpression1}
      root={false}
      selectionTarget={selectionTargetForChild1}
      onSelectionTargetChange={newSelectionTargetFromChild => {
        if (onSelectionTargetChange === undefined) return

        let selectionTargetToSend
        if (newSelectionTargetFromChild !== undefined) {
          const { type, position } = newSelectionTargetFromChild
          selectionTargetToSend = { type, position: [0, ...position] }
        }

        onSelectionTargetChange(selectionTargetToSend)
      }}
    />
    <> </>
    <ExpressionText
      text={symText}
      kind={sym.kind}
      onClick={onSelectionTargetChange !== undefined ? () => {
        let selectionTargetToSend
        if (!isSelected) {
          selectionTargetToSend = { type: TargetType.MAIN, position: [] }
        }

        onSelectionTargetChange(selectionTargetToSend)
      } : undefined}
      isSelected={isSelected}
    />
    <> </>
    <ExpressionView
      expression={childExpression2}
      root={false}
      selectionTarget={selectionTargetForChild2}
      onSelectionTargetChange={newSelectionTargetFromChild => {
        if (onSelectionTargetChange === undefined) return

        let selectionTargetToSend
        if (newSelectionTargetFromChild !== undefined) {
          const { type, position } = newSelectionTargetFromChild
          selectionTargetToSend = { type, position: [1, ...position] }
        }

        onSelectionTargetChange(selectionTargetToSend)
      }}
    />
    {root || <ExpressionText text=")" kind={sym.kind}/>}
  </>
}
