module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    ignorePatterns: ['node_module', 'dist', '.eslintrc.js', 'webpack.config.js', 'webpack.dev.config.js', 'webpack.prod.config.js', 'jest.config.js', '__mocks__'],
    extends: [
        'airbnb-base',
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
        'airbnb-typescript/base',
        'plugin:prettier/recommended',
    ],
    overrides: [],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        tsconfigRootDir: __dirname,
        project: './tsconfig.json',
    },
    plugins: ['prettier', '@typescript-eslint'],
    root: true,
    rules: {
        'import/no-cycle': 'off',
        'no-void': 'off',
        '@typescript-eslint/no-misused-promises': 'off',
        'import/extensions': 'off',
        'prettier/prettier': 'error',
        'no-debugger': 'off',
        'no-console': 0,
        'class-methods-use-this': 'off',
        '@typescript-eslint/no-explicit-any': 'error',
        '@typescript-eslint/explicit-function-return-type': 'error',
        '@typescript-eslint/no-unnecessary-type-assertion': 'error',
        '@typescript-eslint/no-inferrable-types': 'off',
        '@typescript-eslint/no-non-null-assertion': 'error',
        '@typescript-eslint/explicit-member-accessibility': [
            'error',
            {
                accessibility: 'explicit',
                overrides: {
                    accessors: 'explicit',
                    constructors: 'off',
                    methods: 'explicit',
                    properties: 'explicit',
                    parameterProperties: 'explicit',
                },
            },
        ],
    },
};
