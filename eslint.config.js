import tsParser from '@typescript-eslint/parser';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import unicornPlugin from 'eslint-plugin-unicorn';
import perfectionistPlugin from 'eslint-plugin-perfectionist';
import sonarjsPlugin from 'eslint-plugin-sonarjs';
import importPlugin from 'eslint-plugin-import';
import litPlugin from 'eslint-plugin-lit';
import litA11yPlugin from 'eslint-plugin-lit-a11y';
import prettier from 'eslint-config-prettier';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const createPackageConfig = (packageName) => {
	const tsconfigPath = resolve(
		__dirname,
		`packages/${packageName}/tsconfig.json`,
	);

	return {
		files: [
			`packages/${packageName}/**/*.ts`,
			`packages/${packageName}/**/*.tsx`,
		],
		languageOptions: {
			parser: tsParser,
			parserOptions: {
				project: tsconfigPath,
				ecmaVersion: 'latest',
				sourceType: 'module',
				tsconfigRootDir: __dirname,
			},
		},
		plugins: {
			'@typescript-eslint': tsPlugin,
			unicorn: unicornPlugin,
			perfectionist: perfectionistPlugin,
			sonarjs: sonarjsPlugin,
			import: importPlugin,
			lit: litPlugin,
			'lit-a11y': litA11yPlugin,
		},
		settings: {
			'import/resolver': {
				typescript: {
					project: tsconfigPath,
				},
			},
		},
		rules: {
			// TypeScript strict mode
			...tsPlugin.configs['strict-type-checked'].rules,
			...tsPlugin.configs['stylistic-type-checked'].rules,

			// Modern plugins
			...unicornPlugin.configs.recommended.rules,
			...perfectionistPlugin.configs['recommended-natural'].rules,
			...sonarjsPlugin.configs.recommended.rules,
			...litPlugin.configs.recommended.rules,
			...litA11yPlugin.configs.recommended.rules,
			...prettier.rules,

			// Custom project-specific rules
			'@typescript-eslint/no-unused-vars': [
				'error',
				{ argsIgnorePattern: '^_', destructuredArrayIgnorePattern: '^_' },
			],
			'@typescript-eslint/no-non-null-assertion': 'off',
			'@typescript-eslint/consistent-type-imports': [
				'error',
				{ prefer: 'type-imports' },
			],
			'max-lines': [
				'warn',
				{ max: 250, skipComments: true, skipBlankLines: true },
			],

			'unicorn/no-null': 'off',

			'sonarjs/todo-tag': 'warn',
			'sonarjs/fixme-tag': 'warn',
			'sonarjs/no-commented-code': 'warn',
			'unicorn/no-empty-file': 'warn',
		},
	};
};

export default [
	{
		ignores: [
			'**/dist/**',
			'*.js',
			'*.cjs',
			'**/*.dev*',
			'**/*.old*',
			'**/*.config.ts',
			'example-app',
			'packages/webawesome',
		],
	},
	// Package-specific configs
	createPackageConfig('engine'),
	createPackageConfig('generics'),
];
