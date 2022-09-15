module.exports = {
	root: true,
	env: {
		es6: true
	},
	parser: '@typescript-eslint/parser',
	parserOptions: {
		parser: '@typescript-eslint/parser',
		ecmaVersion: 12,
		sourceType: 'module',
		ecmaFeatures: { jsx: true }
	},
	plugins: [
		'@typescript-eslint',
		'react'
	],
	overrides: [
		{
			files: [ '*.ts', '*.tsx' ],
			rules: {
				'@typescript-eslint/no-shadow': ['error'],
				'no-shadow': 'off',
				'no-undef': 'off'
			}
		}
	],
	rules: {
		'no-unused-vars': 2,
		'no-console': 2,
		'no-extra-semi': 2,
		'no-empty': 2,
		'no-multi-spaces': 2,
		'block-spacing': [ 2, 'always' ],
		'comma-dangle': [ 2, 'never' ],
		'comma-spacing': [ 1, { 'before': false, 'after': true } ],
		'no-mixed-spaces-and-tabs': 2,

		"@typescript-eslint/indent": [ 1, 'tab', { 'SwitchCase': 1 } ],
		"@typescript-eslint/semi": [ 2, 'never' ],

		// react
		"react/jsx-closing-bracket-location": 0,
		"react/jsx-sort-props": 0,
		"react/jsx-uses-react": 1,
		"react/jsx-uses-vars": 1,
		"react/no-array-index-key": 0,
		"react/sort-comp": [ 2, {
			"order": [ "static-methods", "lifecycle", "render" ],
			"groups": {
				"lifecycle": [
					"displayName",
					"propTypes",
					"contextTypes",
					"childContextTypes",
					"getChildContext",
					"mixins",
					"statics",
					"defaultProps",
					"getDefaultProps",
					"getInitialState",
					"constructor",
					"state",
					"componentWillMount",
					"componentDidMount",
					"componentWillReceiveProps",
					"shouldComponentUpdate",
					"componentWillUpdate",
					"componentDidUpdate",
					"componentWillUnmount"
				]
			}
		} ]
	}
}
