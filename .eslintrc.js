module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  },
  plugins: ['babel'],
  settings: {
    react: {
      version: 'detect'
    }
  },
  overrides: [
    {
      files: [
        'src/**/*.js',
        'src/**/*.jsx'
      ]
    }
  ],
  env: {
    commonjs: true,
    browser: true,
    es6: true,
    jest: true,
    node: true
  },
  globals: {
    process: true
  },
  extends: [
    'standard',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended'
  ],
  rules: {
    'react/prop-types': 'off',
    'max-len': ['error', {
      code: 100,
      ignoreStrings: true,
      ignoreTemplateLiterals: true
    }],
    'no-unused-expressions': 'off',
    'babel/no-unused-expressions': 'error'
  }
}
