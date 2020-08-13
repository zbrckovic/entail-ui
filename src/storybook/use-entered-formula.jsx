import { FormulaParser } from '@zbrckovic/entail-core/lib/parsers/formula-parser'
import { primitivePresentationCtx } from '@zbrckovic/entail-core/lib/presentation/sym-presentation/primitive-presentation-ctx'
import { useEffect, useState } from 'react'
import { Subject } from 'rxjs'
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators'

/** Return the result of parsing the formula text entered into the input field. */
export const useEnteredFormula = initialText => {
  const lastText = initialText

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
    const parser = new FormulaParser(primitivePresentationCtx)
    const formula = parser.parse(text)
    success = {
      formula,
      presentationCtx: parser.presentationCtx
    }
  } catch (e) {
    error = e
  }

  return {
    success,
    error
  }
}
