import { DeductionParser, primitiveSyms, primitivePresentations } from '@zbrckovic/entail-core'
import { useEffect, useState } from 'react'
import { Subject } from 'rxjs'
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators'

// Return the result of parsing the deduction text entered into the input field.
export const useEnteredDeduction = initialText => {
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
    const parser = DeductionParser({ syms: primitiveSyms, presentations: primitivePresentations })

    success = {
      deduction: parser.parse(text),
      syms: parser.getSyms(),
      presentations: parser.getPresentations()
    }
  } catch (e) {
    error = e
  }

  return { success, error }
}
