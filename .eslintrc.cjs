/*eslint no-undef: "error"*/
/*eslint-env node*/
module.exports = {
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': 0,
    '@typescript-eslint/no-unused-vars': 'error',
    'react-hooks/exhaustive-deps': 0,
  },
}
