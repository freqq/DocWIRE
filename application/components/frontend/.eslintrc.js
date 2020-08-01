module.exports = {
  extends: ['airbnb', 'prettier'],
  parser: 'babel-eslint',
  env: {
    browser: true,
    'jest/globals': true,
  },
  settings: {
    'import/resolver': {
      node: {
        paths: ['src'],
      },
    },
  },
  plugins: ['jest', 'prettier'],
  rules: {
    'jsx-a11y': 0,
    'prettier/prettier': 'error',
  },
};
