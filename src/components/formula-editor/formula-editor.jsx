import { Button, Callout, Intent, TextArea } from '@blueprintjs/core'
import { FormulaParser } from '@zbrckovic/entail-core/lib/parsers/formula-parser'
import { ExpressionView } from 'components/expression-view'
import { SymPresentationCtx } from 'contexts'
import React, { useContext, useEffect, useMemo, useState } from 'react'
import { Subject } from 'rxjs'
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators'
import style from './formula-editor.module.scss'

export const FormulaEditor = ({ onSubmit, onCancel }) => {
  const parse = useParser()

  const [text, setText] = useState('')
  const [textSubject] = useState(new Subject())
  const [parseResult, setParseResult] = useState()

  useEffect(() => {
    const subscription = textSubject
      .pipe(
        distinctUntilChanged(),
        debounceTime(200),
        map(parse)
      )
      .subscribe(setParseResult)

    return () => { subscription.unsubscribe() }
  }, [parse, textSubject])
  useEffect(() => { textSubject.next(text) }, [textSubject, text])

  const content = useMemo(() => {
    if (parseResult === undefined) return <div>Empty</div>

    const { result, error } = parseResult

    if (error !== undefined) {
      return <Callout intent={Intent.DANGER}>{error.message}</Callout>
    }

    const { formula, presentationCtx } = result
    return (
      <SymPresentationCtx.Provider value={presentationCtx}>
        <ExpressionView expression={formula}/>
      </SymPresentationCtx.Provider>
    )
  }, [parseResult])

  return (
    <div className={style.container}>
      {content}
      <TextArea
        value={text}
        onChange={event => { setText(event.target.value) }}
      />
      <Button
        intent={Intent.PRIMARY}
        icon="confirm"
        minimal
        onClick={() => { onSubmit(parseResult.result) }}
        disabled={parseResult?.result?.formula === undefined}
      />
      <Button
        icon="disable"
        minimal
        onClick={() => { onCancel() }}
      />
    </div>
  )
}

const useParser = () => {
  const presentationCtx = useContext(SymPresentationCtx)

  return text => {
    try {
      const parser = new FormulaParser(presentationCtx)
      const formula = parser.parse(text)
      return { result: { formula, presentationCtx: parser.presentationCtx } }
    } catch (error) {
      return { error }
    }
  }
}
