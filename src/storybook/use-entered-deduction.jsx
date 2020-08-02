import { text } from '@storybook/addon-knobs'
import { primitivePresentationCtx } from '@zbrckovic/entail-core/lib/presentation/sym-presentation/primitive-presentation-ctx'
import { useEffect, useState } from 'react'
import { Subject } from 'rxjs'
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators'
import { DeductionParser } from '@zbrckovic/entail-core/lib/parsers/deduction-parser/deduction-parser'

/** Return the result of parsing the deduction text entered into the input field. */
export const useEnteredDeduction = initialText => {
  const lastText = text('Deduction', initialText)

  const [state, setState] = useState()
  const [textSubject] = useState(new Subject())

  useEffect(() => {
    const subscription = textSubject
      .pipe(
        distinctUntilChanged(),
        debounceTime(200),
        map(parse)
      )
      .subscribe(setState)

    return () => { subscription.unsubscribe() }
  }, [textSubject])
  useEffect(() => { textSubject.next(lastText) }, [textSubject, lastText])

  return state
}

const parse = text => {
  let success
  let error

  try {
    const parser = new DeductionParser(primitivePresentationCtx)
    const deduction = parser.parse(text)
    const presentationCtx = parser.presentationCtx
    success = { deduction, presentationCtx }
  } catch (e) {
    error = e
  }

  return { success, error }
}
