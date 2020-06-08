module.exports = {
  extends: [
    'airbnb',
    'prettier',
  ],
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
  plugins: [
    'jest',
    'prettier',
  ],
  rules: {
    "prettier/prettier": "error",
  },
};
