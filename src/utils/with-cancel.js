// Wraps `promise` into cancellable promise - one which never resolves nor rejects once it has been
// cancelled.
export const withCancel = promise => {
  let isCancelled = false

  return [
    new Promise((resolve, reject) => {
      promise.then(
        result => {
          if (!isCancelled) {
            resolve(result)
          }
        },
        error => {
          if (!isCancelled) {
            reject(error)
          }
        }
      )
    }),
    () => { isCancelled = true }
  ]
}
