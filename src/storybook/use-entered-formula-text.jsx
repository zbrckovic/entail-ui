import { FormulaParser, primitiveSyms, primitivePresentations } from '@zbrckovic/entail-core'
import { useEffect, useState } from 'react'
import { Subject } from 'rxjs'
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators'

export const useEnteredFormulaText = text => {
  const [parseResult, setParseResult] = useState()
  const [textSubject] = useState(new Subject())

  useEffect(() => {
    const subscription = textSubject
      .pipe(
        distinctUntilChanged(),
        debounceTime(200),
        map(parse)
      )
      .subscribe(setParseResult)

    return () => { subscription.unsubscribe() }
  }, [textSubject])
  useEffect(() => { textSubject.next(text) }, [textSubject, text])

  return parseResult
}

const parse = text => {
  let success
  let error

  try {
    const parser = FormulaParser({ syms: primitiveSyms, presentations: primitivePresentations })

    success = {
      formula: parser.parse(text),
      syms: parser.getSyms(),
      presentations: parser.getPresentations()
    }
  } catch (e) {
    error = e
  }

  return { success, error }
}
