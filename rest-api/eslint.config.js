import pluginJs from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier';
import prettierPlugin from 'eslint-plugin-prettier';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default [
  {
    files: ['**/*.{js,mjs,cjs,ts}'],
    languageOptions: {
      globals: globals.node,
      parser: '@typescript-eslint/parser',
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: './tsconfig.json', // Ensure this points to your tsconfig.json
      },
    },
    plugins: {
      prettier: prettierPlugin,
      'simple-import-sort': simpleImportSort,
    },
    rules: {
      // JavaScript rules
      'no-console': 'warn', // Warns about console.log statements
      'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      indent: ['error', 2],
      quotes: ['error', 'single'],
      semi: ['error', 'always'],

      // TypeScript rules
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_' },
      ],
      '@typescript-eslint/explicit-function-return-type': 'off', // Allow inferred return types

      // Prettier rule
      'prettier/prettier': 'error',

      // Simple Import Sort rules
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',
    },
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  eslintConfigPrettier,
];
