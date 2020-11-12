import { Category, primitiveSyms, Sym } from '@zbrckovic/entail-core'
import React, { Fragment, useMemo } from 'react'
import { ExpressionView } from './expression-view'
import { ExpressionText, TargetType } from './expression-text'
import { Binding } from './binding'

export const Prefix = ({
  sym,
  symText,
  boundSym,
  childrenExpressions,
  selectionTarget,
  onSelectionTargetChange
}) => {
  const isPrimitive = primitiveSyms[sym.id] !== undefined

  const hasParenthesesAndComma = useMemo(() => {
    if (childrenExpressions.length === 0) return false
    if (isPrimitive && childrenExpressions.length === 1) return false

    const isPredicate = Sym.getCategory(sym) === Category.FT
    if (isPredicate) {
      const areAllChildrenNullary = childrenExpressions.every(({ sym }) => sym.arity === 0)
      if (areAllChildrenNullary) return false
    }

    return true
  }, [isPrimitive, childrenExpressions, sym])

  const hasSpace = childrenExpressions.length > 0 && sym.binds && isPrimitive

  const isSelected = selectionTarget?.position.length === 0
  const isMainSelected = isSelected && selectionTarget.type === TargetType.MAIN
  const isBoundSelected = isSelected && selectionTarget.type === TargetType.BOUND

  return <>
    <ExpressionText
      text={symText}
      kind={sym.kind}
      onClick={onSelectionTargetChange !== undefined ? () => {
        let selectionTargetToSend
        if (!isMainSelected) {
          selectionTargetToSend = { type: TargetType.MAIN, position: [] }
        }

        onSelectionTargetChange(selectionTargetToSend)
      } : undefined}
      isSelected={isMainSelected}
    />
    {sym.binds && (
      <Binding
        sym={boundSym}
        onClick={onSelectionTargetChange !== undefined ? () => {
          const selectionTargetToSend = isBoundSelected
            ? undefined
            : { type: TargetType.BOUND, position: [] }

          onSelectionTargetChange(selectionTargetToSend)
        } : undefined}
        isSelected={isBoundSelected}
      />
    )}
    {hasSpace && <> </>}
    {hasParenthesesAndComma && <ExpressionText text="(" kind={sym.kind}/>}
    {childrenExpressions.map((child, i) => {
      const isLast = i === childrenExpressions.length - 1

      let selectionTargetForChild
      if (!isSelected && selectionTarget !== undefined) {
        const { type, position: [firstIndex, ...restIndexes] } = selectionTarget

        if (firstIndex === i) {
          selectionTargetForChild = { type, position: restIndexes }
        }
      }

      return <Fragment key={`${i}`}>
        <ExpressionView
          expression={child}
          root={false}
          selectionTarget={selectionTargetForChild}
          onSelectionTargetChange={newSelectionTargetFromChild => {
            if (onSelectionTargetChange === undefined) return

            let selectionTargetToSend
            if (newSelectionTargetFromChild !== undefined) {
              const { type, position } = newSelectionTargetFromChild
              selectionTargetToSend = { type, position: [i, ...position] }
            }

            onSelectionTargetChange(selectionTargetToSend)
          }}
        />
        {
          !isLast && hasParenthesesAndComma && <>
            <ExpressionText text="," kind={sym.kind}/>
            <> </>
          </>
        }
      </Fragment>
    })}
    {hasParenthesesAndComma && <ExpressionText text=")" kind={sym.kind}/>}
  </>
}
