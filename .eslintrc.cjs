/** @type {import("@types/eslint").Linter.Config} */

module.exports = {
	settings: {
		// This loads <rootdir>/tsconfig.json to eslint
		'import/resolver': {
			typescript: { project: ['./tsconfig.json'] },
		},
	},
	// env: {
	//   node: true,
	//   es2022: true,
	//   browser: true,
	// },

	overrides: [
		{
			files: ['*.ts', '*.mts', '*.cts'],
			plugins: [
				//
				'eslint-plugin-tsdoc',
				'@typescript-eslint',
			],

			parser: '@typescript-eslint/parser',
			parserOptions: {
				project: ['./tsconfig.json'], // Specify it only for TypeScript files
				ecmaVersion: 'latest',
				sourceType: 'module',
			},

			extends: [
				'airbnb-base',
				'airbnb-typescript',

				'plugin:@typescript-eslint/recommended',
				'plugin:@typescript-eslint/recommended-requiring-type-checking',
				'plugin:@typescript-eslint/strict',

				'prettier',
			],

			rules: {
				'tsdoc/syntax': 'warn',

				'@typescript-eslint/no-unused-vars': [
					'error',
					{ argsIgnorePattern: '^_', destructuredArrayIgnorePattern: '^_' },
				],
				'@typescript-eslint/no-non-null-assertion': 'off',

				'max-lines': [
					'warn',
					{ max: 150, skipComments: true, skipBlankLines: true },
				],

				'react/jsx-filename-extension': 'off',

				'import/prefer-default-export': 'off',

				'import/extensions': 'off',
				'prefer-destructuring': 'off',
				// 'import/extensions': [
				//   'error',
				//   'ignorePackages',
				//   {
				//     js: 'never',
				//     jsx: 'never',
				//     ts: 'never',
				//     tsx: 'never',
				//   },
				// ],
				'import/order': 'off',
			},
		},
	],
};
