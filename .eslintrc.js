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
    // eslint规则 https://cn.eslint.org/docs/rules/
    // Possible Errors
    // 禁用 console
    'no-console': [
      process.env.NODE_ENV === 'production' ? 'warn' : 'warn',
      {
        allow: ['info', 'table', 'warn', 'error'],
      },
    ],

    // 禁用 debugger
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'warn',

    // 禁止在循环中出现 await
    'no-await-in-loop': 'error',

    // Best Practices
    // 强制数组方法的回调函数中有 return 语句
    'array-callback-return': 'error',

    // 强制把变量的使用限制在其定义的作用域范围内
    'block-scoped-var': 'error',

    // 强制类方法使用 this
    'class-methods-use-this': 'error',

    // 要求遵循大括号约定
    curly: ['error', 'all'],

    // 要求使用 === 和 !==
    eqeqeq: 'off',

    // 强制每个文件中包含的的类的最大数量
    'max-classes-per-file': ['error', 1],

    // 禁止使用看起来像除法的正则表达式
    'no-div-regex': 'error',

    // 禁止使用看起来像除法的正则表达式
    'no-else-return': [
      'error',
      {
        allowElseIf: false,
      },
    ],

    // 禁止出现空函数
    'no-empty-function': 'error',

    // 禁止出现多个空格
    'no-multi-spaces': 'error',

    // 禁用一成不变的循环条件
    'no-unmodified-loop-condition': 'error',

    // 禁止或强制在代码块中开括号前和闭括号后有空格
    'block-spacing': ['error', 'always'],

    // 要求使用骆驼拼写法
    camelcase: [
      'error',
      {
        properties: 'never',
      },
    ],

    // 要求或禁止文件末尾保留一行空行
    'eol-last': ['error', 'always'],

    // 强制隐式返回的箭头函数体的位置
    'implicit-arrow-linebreak': ['error', 'beside'],

    // 要求或禁止在类成员之间出现空行
    'lines-between-class-members': ['error', 'always'],

    // 禁止连续赋值
    'no-multi-assign': 'error',

    // 不允许多个空行
    'no-multiple-empty-lines': [
      'error',
      {
        max: 1,
      },
    ],
    
    // 强制函数中的变量在一起声明或分开声明
    'one-var': ['error', 'never'],

    // 要求或禁止在注释前有空白
    'spaced-comment': ['error', 'always'],

    // 强制在 switch 的冒号左右有空格
    'switch-colon-spacing': [
      'error',
      {
        after: true,
        before: false,
      },
    ],

    // 要求正则表达式被括号括起来
    'wrap-regex': 'error',

    // ECMAScript 6
    // 要求箭头函数体使用大括号
    'arrow-body-style': ['error', 'always'],

    // 要求箭头函数的参数使用圆括号
    'arrow-parens': ['error', 'always'],

    // 要求箭头函数的箭头之前或之后有空格
    'arrow-spacing': [
      'error',
      {
        before: true,
        after: true,
      },
    ],

    // 禁止重复导入
    'no-duplicate-imports': ['error'],

    // 要求使用 let 或 const 而不是 var
    'no-var': ['error'],

    // 要求对象字面量简写语法
    'object-shorthand': ['error'],

    // 要求使用箭头函数作为回调
    'prefer-arrow-callback': ['error'],

    // 建议使用const
    'prefer-const': ['error'],

    // 建议使用剩余参数代替 arguments
    'prefer-rest-params': ['error'],

    // vue eslint https://eslint.vuejs.org/rules/
    // vue/strongly-recommended
    // 组件名称
    'vue/component-definition-name-casing': ['error', 'PascalCase'],

    "vue/html-closing-bracket-newline": ["error", {
      "singleline": "never",
      "multiline": "never"
    }],

    "vue/multiline-html-element-content-newline": ["error", {
      "ignoreWhenEmpty": true,
      "allowEmptyLines": false,
      "ignores": ["pre", "textarea"],
    }],

    // 标签自闭和
    'vue/html-self-closing': [
      'error',
      {
        html: {
          void: 'always',
          normal: 'never',
          component: 'never',
        },
        svg: 'never',
        math: 'never',
      },
    ],

    // vue/recommended
    // 元素或组件标签顺序
    'vue/attributes-order': [
      'error',
      {
        order: [
          'DEFINITION', // e.g. 'is', 'v-is'
          'LIST_RENDERING', // e.g. 'v-for item in items'
          'CONDITIONALS', // e.g. 'v-if', 'v-else-if', 'v-else', 'v-show', 'v-cloak'
          'RENDER_MODIFIERS', // e.g. 'v-once', 'v-pre'
          'GLOBAL', // e.g. 'id'
          'UNIQUE', // e.g. 'ref', 'key'
          'SLOT', // e.g. 'v-slot', 'slot'
          'TWO_WAY_BINDING', // e.g. 'v-model'
          'OTHER_DIRECTIVES', //  e.g. 'v-custom-directive'
          'OTHER_ATTR', // e.g. 'custom-prop="foo"', 'v-bind:prop="foo"', ':prop="foo"'
          'EVENTS', // e.g. '@click="functionCall"', 'v-on="event"'
          'CONTENT', // e.g. 'v-text', 'v-html'
        ],
        alphabetical: false,
      },
    ],

    // "template", "script", "style"3个标签顺序
    'vue/component-tags-order': [
      'error',
      {
        order: ['template', 'script', 'style'],
      },
    ],

    // vue组件属性,生命周期顺序
    'vue/order-in-components': [
      'error',
      {
        order: [
          'el',
          'name',
          'key',
          'parent',
          'functional',
          'delimiters',
          'comments',
          'components',
          'directives',
          'filters',
          'extends',
          'mixins',
          'provide',
          'inject',
          'ROUTER_GUARDS',
          'layout',
          'middleware',
          'validate',
          'scrollToTop',
          'transition',
          'loading',
          'inheritAttrs',
          'model',
          'props',
          'propsData',
          'emits',
          'setup',
          'asyncData',
          'data',
          'fetch',
          'head',
          'computed',
          'watch',
          'watchQuery',
          'LIFECYCLE_HOOKS',
          'methods',
          'template',
          'render',
          'renderError',
        ],
      },
    ],



    // import/recommended
    // https://github.com/import-js/eslint-plugin-import/tree/v2.25.3/docs/rules
    'import/no-unresolved': 'off',
    'import/no-named-as-default': 'off',
    'import/first': 'error',
    'import/newline-after-import': [
      'error',
      {
        count: 1,
      },
    ],
  }
}
