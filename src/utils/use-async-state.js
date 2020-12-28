import { useReducer, useRef } from 'react'

export const useAsyncState = () => {
  const [state, dispatch] = useReducer(
    (state, { type, payload }) => {
      switch (type) {
        case 'start': {
          return { inProgress: true, params: payload }
        }
        case 'resolved': {
          return { resolved: true, result: payload }
        }
        case 'rejected': {
          return { rejected: true, error: payload }
        }
        case 'reset': {
          return { idle: true }
        }
      }
    },
    { idle: true }
  )

  const { current: actions } = useRef({
    start: params => { dispatch({ type: 'start', payload: params }) },
    resolve: result => { dispatch({ type: 'resolved', payload: result }) },
    reject: error => { dispatch({ type: 'rejected', payload: error }) },
    reset: () => { dispatch({ type: 'reset' }) }
  })

  return [state, actions]
}
