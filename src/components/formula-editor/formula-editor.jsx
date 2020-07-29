import { Button, Callout, Intent, TextArea } from '@blueprintjs/core'
import { FormulaParser } from '@zbrckovic/entail-core/lib/parsers/formula-parser'
import classNames from 'classnames'
import { ExpressionView } from 'components/expression-view'
import { SymPresentationCtx } from 'contexts'
import React, { useContext, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Subject } from 'rxjs'
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators'
import { useParserErrorDescriber } from '../../hooks'
import style from './formula-editor.module.scss'

export const FormulaEditor = ({ className, onSubmit, onCancel }) => {
  const parse = useParser()
  const { t } = useTranslation('FormulaEditor')

  const describeError = useParserErrorDescriber()

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

  const formula = parseResult?.success?.formula
  const presentationCtx = parseResult?.success?.presentationCtx
  const error = parseResult?.error

  return (
    <div className={classNames(className, style.container)}>
      <div className={style['result-container']}>
        {
          formula !== undefined &&
          <SymPresentationCtx.Provider value={presentationCtx}>
            <ExpressionView className={style['expression-view']} expression={formula}/>
          </SymPresentationCtx.Provider>
        }
        {
          text.length > 0 && error !== undefined &&
          <Callout intent={Intent.DANGER}>{describeError(error)}</Callout>
        }
      </div>
      <TextArea
        fill
        rows={10}
        value={text}
        onChange={event => { setText(event.target.value) }}
      />
      <div className={style.controls}>
        <Button
          intent={Intent.PRIMARY}
          icon="confirm"
          title={t('button.submit')}
          onClick={() => { onSubmit(parseResult?.success?.formula) }}
          disabled={formula === undefined}
        />
        <Button
          icon="disable"
          title={t('button.cancel')}
          onClick={() => { onCancel() }}
        />
      </div>
    </div>
  )
}

const useParser = () => {
  const presentationCtx = useContext(SymPresentationCtx)

  return text => {
    try {
      const parser = new FormulaParser(presentationCtx)
      const formula = parser.parse(text)
      return { success: { formula, presentationCtx: parser.presentationCtx } }
    } catch (error) {
      return { error }
    }
  }
}
