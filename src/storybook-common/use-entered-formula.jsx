import { text } from '@storybook/addon-knobs'
import { FormulaParser } from '@zbrckovic/entail-core/lib/parsers/formula-parser'
import { primitivePresentationCtx } from '@zbrckovic/entail-core/lib/presentation/sym-presentation/primitive-presentation-ctx'
import { useEffect, useState } from 'react'
import { Subject } from 'rxjs'
import { debounceTime, distinctUntilChanged, map, tap } from 'rxjs/operators'

/** Return the result of parsing the formula text entered into the input field. */
export const useEnteredFormula = initialText => {
  const lastText = text('Formula', initialText)

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
  try {
    const parser = new FormulaParser(primitivePresentationCtx)
    const formula = parser.parse(text)
    return { formula, presentationCtx: parser.presentationCtx, error: undefined }
  } catch (error) {
    return { formula: undefined, presentationCtx: primitivePresentationCtx, error }
  }
}
