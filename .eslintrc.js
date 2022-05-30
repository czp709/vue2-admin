module.exports = {
  root: true,

  env: {
    node: true
  },

  extends: [
    'plugin:vue/essential',
    '@vue/standard'
  ],

  parserOptions: {
    parser: 'babel-eslint'
  },

  rules: {
    'space-in-parens': [
      0
    ],
    'no-tabs': [
      0
    ],
    'global-require': [
      0
    ],
    'react/jsx-filename-extension': [
      0
    ],
    indent: [
      'error',
      2
    ],
    'react/jsx-indent': [
      0
    ],
    'jsx-a11y/anchor-is-valid': [
      0
    ],
    'import/extensions': [
      0
    ],
    'react/jsx-curly-spacing': [
      0
    ],
    'react/jsx-tag-spacing': [
      0
    ],
    'react/require-default-props': [
      0
    ],
    'class-methods-use-this': [
      'off'
    ],
    'arrow-body-style': [
      'warn',
      'always'
    ],
    'padded-blocks': [
      'off'
    ],
    'no-trailing-spaces': [
      'error',
      {
        ignoreComments: true
      }
    ],
    'react/jsx-indent-props': [
      0
    ],
    'no-nested-ternary': [
      'error'
    ],
    'no-underscore-dangle': [
      'off',
      'always'
    ],
    'prefer-destructuring': [
      'warn'
    ],
    camelcase: [
      'warn'
    ],
    'no-irregular-whitespace': [
      'warn'
    ],
    'jsx-a11y/no-static-element-interactions': [
      0
    ],
    'jsx-a11y/click-events-have-key-events': [
      0
    ],
    'no-return-assign': [
      'off'
    ],
    'consistent-return': [
      'error',
      {
        treatUndefinedAsUnspecified: true
      }
    ],
    'dot-notation': [
      'warn'
    ],
    'linebreak-style': [0, "unix"],
    quotes: [
      'error',
      'double'
    ],
    'no-console': [
      'warn',
      {
        allow: [
          'warn',
          'error',
          'log'
        ]
      }
    ],
    'import/no-useless-path-segments': 'off',
    'object-curly-newline': 'off',
    'no-shadow': 'off',
    'react/jsx-one-expression-per-line': 'off',
    'jsx-a11y/label-has-associated-control': 'off',
    'jsx-a11y/label-has-for': 'off',
    'vue/no-v-html': 'warn',
    'vue/eqeqeq': 'warn'
  }
}
