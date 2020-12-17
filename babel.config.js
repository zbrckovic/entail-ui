module.exports = api => {
  api.cache.invalidate(() => process.env.NODE_ENV)

  const presets = [
    [
      '@babel/preset-env',
      {
        useBuiltIns: 'usage',
        corejs: 3
      }
    ],
    '@babel/preset-react'
  ]

  return {
    presets,
    sourceMaps: true
  }
}
