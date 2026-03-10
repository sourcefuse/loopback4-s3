module.exports = {
  extends: '@loopback/eslint-config',
  rules: {
    'no-extra-boolean-cast': 'off',
    '@typescript-eslint/interface-name-prefix': 'off',
    'no-prototype-builtins': 'off',
    '@typescript-eslint/no-misused-promises': [
      'error',
      {
        checksVoidReturn: false,
      },
    ],
  },
  parserOptions: {
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
  },
  overrides: [
    {
      // scripts/ are plain Node.js JS files not covered by tsconfig.json,
      // so disable typed linting rules for them
      files: ['scripts/**/*.js'],
      parserOptions: {
        project: null,
      },
      rules: {
        '@typescript-eslint/no-var-requires': 'off',
        '@typescript-eslint/no-misused-promises': 'off',
      },
    },
  ],
};
