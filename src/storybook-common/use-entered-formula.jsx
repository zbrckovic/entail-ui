import { text } from '@storybook/addon-knobs'
import { FormulaParser } from '@zbrckovic/entail-core/lib/parsers/formula-parser'
import { primitivePresentationCtx } from '@zbrckovic/entail-core/lib/presentation/sym-presentation/primitive-presentation-ctx'
import { useEffect, useState } from 'react'
import { BehaviorSubject } from 'rxjs'
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators'

/** Return the result of parsing the formula text entered into the input field. */
export const useEnteredFormula = initialText => {
  const textSubject = useTextSubject(initialText)

  const [state, setState] = useState(() => parse(textSubject.value))

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

  return state
}

/** Get the subject which sends text entered into the input field.  */
const useTextSubject = initialText => {
  const lastText = text('Formula', initialText)
  const [textSubject] = useState(() => new BehaviorSubject(lastText))

  useEffect(() => { textSubject.next(lastText) }, [textSubject, lastText])

  return textSubject
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
