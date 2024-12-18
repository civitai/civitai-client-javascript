const tsPlugin = require('@typescript-eslint/eslint-plugin');
const tsParser = require('@typescript-eslint/parser');
const prettierPlugin = require('eslint-plugin-prettier');

module.exports = [
  {
    files: [ "**/*.ts" ],
    languageOptions: {
      parser: tsParser
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
      prettier: prettierPlugin,
    },
    ignores: [
      '*.js',
      '*.mjs',
      'dist',
      'node_modules/**/**',
      'src/generated/**/**',
    ],
    rules: {
      ...tsPlugin.configs.recommended.rules,
      ...prettierPlugin.configs.recommended.rules,
      // aligns closing brackets for tags
      // 'react/jsx-closing-bracket-location': ['error', 'line-aligned'],
      'prettier/prettier': ['error', {
        printWidth: 100,
        endOfLine: 'auto',
        singleQuote: true,
        trailingComma: 'es5',
        tabWidth: 2,
      }],
      'no-use-before-define': 'off',
      '@typescript-eslint/no-use-before-define': 'off',
      // allows ignoring ts checks
      '@typescript-eslint/ban-ts-comment': 'off',
      // allows destructuring to ignore fields
      '@typescript-eslint/no-unused-vars': ['warn', { 'ignoreRestSiblings': true }],
      '@typescript-eslint/no-namespace': 'off',
      '@typescript-eslint/no-non-null-assertion': 'off',
      '@typescript-eslint/no-empty-object-type': 'off',
      "@typescript-eslint/no-explicit-any": ["off"],
      // '@typescript-eslint/ban-types': ["error",
      //   {
      //       "types": {
      //           "String": false,
      //           "Boolean": false,
      //           "Number": false,
      //           "Symbol": false,
      //           "{}": false,
      //           "Object": false,
      //           "object": false,
      //           "Function": false,
      //       },
      //       "extendDefaults": true
      //   }
      // ]
    }
  }
]
