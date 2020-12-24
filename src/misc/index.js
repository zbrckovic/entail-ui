export const withCancel = promise => {
  let isCancelled = false

  const cancellablePromise = new Promise((resolve, reject) => {
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
  })

  const cancel = () => { isCancelled = true }

  return [cancellablePromise, cancel]
}
