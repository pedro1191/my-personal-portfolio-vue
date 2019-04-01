module.exports = {
  root: true,
  env: {
    node: true
  },
  'plugins': [
    'es-beautifier'
  ],
  'extends': [
    'plugin:vue/essential',
    'plugin:es-beautifier/standard',
    'eslint:recommended'
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}
