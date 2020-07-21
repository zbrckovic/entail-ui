import { RootCtx } from 'contexts'
import { useContext, useRef, useState } from 'react'
import { useMemoOne } from 'use-memo-one'

/**
 * On each call check which of the provided values has changed since last call and return the
 * one which has changed most recently. If both values have changed in the same call, return
 * `val1`.
 */
const useLatest = (val1, val2) => {
  const latestRef = useRef()
  useMemoOne(() => { latestRef.current = val2 }, [val2])
  useMemoOne(() => { latestRef.current = val1 }, [val1])
  return latestRef.current
}

/**
 * Calls `useState(externalState)` internally and returns `[state, setState]` just as the normal
 * React's `useState` hook but with the following difference: Returned state will be either a
 * regular state managed by React's `useState` or `externalState`, whichever is newer. This is used
 * in cases where prop value or context value change should override current state and extra render
 * is not desirable which happens if this issue is handled with `useEffect`.
 */
export const useOverridableState = externalState => {
  const [state, setState] = useState(externalState)
  return [useLatest(externalState, state), setState]
}

/**
 * Returns an object to be used with `classNames`. It will include `darkClass` key depending on
 * whether dark theme is active. If `lightClass` is specified it will also include `lightClass` key
 * if light time is active.
 */
export const useThemeClasses = (darkClass = 'dark', lightClass) => {
  const { themeDark } = useContext(RootCtx)

  const result = { [darkClass]: themeDark }
  if (lightClass !== undefined) result[lightClass] = !themeDark

  return result
}
