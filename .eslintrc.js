module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
  },
  extends: [
    'eslint:recommended', // Add eslint:recommended
    'plugin:prettier/recommended', // Add plugin:prettier/recommended
    'airbnb-base',
  ],
  overrides: [
    {
      env: {
        node: true,
      },
      files: ['.eslintrc.{js,cjs}'],
      parserOptions: {
        sourceType: 'script',
      },
    },
  ],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  rules: {
    // You can add any additional rules here if needed
  },
};
