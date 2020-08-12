export const curry = f => {
  const curried = (...args) =>
    args.length >= f.length
      ? f(...args)
      : (...argsRest) => curried(...args, ...argsRest)

  return curried
}

export const pipe = (...fns) => arg => fns.reduce((value, f) => f(value), arg)
