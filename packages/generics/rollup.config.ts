import { babel } from '@rollup/plugin-babel';
import babelPluginPresetReact from '@babel/preset-react';

import typescript from '@rollup/plugin-typescript';
import resolve from '@rollup/plugin-node-resolve';
import externals from 'rollup-plugin-node-externals';

import babelPluginSyntaxTypescript from '@babel/plugin-syntax-typescript';
import babelPluginJsxToLiterals from '@gracile-labs/babel-plugin-jsx-to-literals';
import babelPluginVue from '@vue/babel-plugin-jsx';
// import babelPresetSolid from 'babel-preset-solid';

import { defineConfig, type RollupOptions } from 'rollup';

const extensions = ['.js', '.ts', '.tsx'];

const common = {
	input: './src/index.framework.ts',
	output: {
		format: 'es',
		sourcemap: true,
		preserveModules: true,
	},
	plugins: [externals(), resolve({ extensions })],
	external: (id) => {
		// for link and workspace protocol
		return (
			id.includes('/@gracile') ||
			// id.includes('/@jsfe/engine') ||
			id.includes('/@jsfe/generics') ||
			id === 'preact' ||
			id.includes('/preact-jsx-runtime')
		);
	},
} as const satisfies RollupOptions;

const babelCommonSettings = {
	extensions,
	sourceType: 'unambiguous',
	babelHelpers: 'bundled', // NOTE: Explicit default.
} as const;

const tsFrameworkIncludes = [
	'src/index.framework.ts',
	'src/widgets/*.tsx',
	'src/form.tsx',
	'src/form-generic.tsx',
	'src/types.ts',
];

const enabled = {
	lit: true,
	preact: false,
	react: false,
	vue: false,
};

const options: RollupOptions[] = [];

// ---

if (enabled.lit)
	options.push({
		...common,
		input: './src/index.ts',
		output: { ...common.output, dir: 'dist/lit' },
		plugins: [
			...common.plugins,
			typescript({
				outDir: 'dist/lit',
				include: [
					'src/index.ts',
					'src/widgets/*.tsx',
					'src/form.tsx',
					'src/form-generic.tsx',
					'src/elements.tsx',
					'src/types.ts',
				],
				// transformers: {
				// 	after: [compileLitTemplates()],
				// },
			}),
			babel({
				...babelCommonSettings,
				plugins: [
					[babelPluginSyntaxTypescript, { isTSX: true }],
					[babelPluginJsxToLiterals],
				],
			}),
		],
	});

if (enabled.preact)
	options.push({
		...common,
		output: { ...common.output, dir: 'dist/preact' },
		plugins: [
			...common.plugins,
			typescript({ outDir: 'dist/preact', include: tsFrameworkIncludes }),
			babel({
				...babelCommonSettings,
				plugins: [[babelPluginJsxMeta, { framework: 'preact' }]],
				presets: [
					[
						babelPluginPresetReact,
						{ runtime: 'automatic', importSource: 'preact-jsx-runtime' },
					],
				],
			}),
		],
	});

if (enabled.react)
	options.push({
		...common,
		output: { ...common.output, dir: 'dist/react' },
		plugins: [
			...common.plugins,
			typescript({ outDir: 'dist/react', include: tsFrameworkIncludes }),
			babel({
				...babelCommonSettings,
				plugins: [[babelPluginJsxMeta, { framework: 'react' /* (default) */ }]],
				presets: [[babelPluginPresetReact, { runtime: 'automatic' }]],
			}),
		],
	});

if (enabled.vue)
	options.push({
		...common,
		output: { ...common.output, dir: 'dist/vue' },
		plugins: [
			...common.plugins,
			typescript({ outDir: 'dist/vue', include: tsFrameworkIncludes }),
			babel({
				...babelCommonSettings,
				plugins: [[babelPluginJsxMeta, { framework: 'vue' }], babelPluginVue],
			}),
		],
	});

export default defineConfig(options);

// {
// 	...common,
// 	output: { ...common.output, dir: 'dist/solid' },
// 	plugins: [
// 		...common.plugins,
// 		typescript({ outDir: 'dist/solid', include: tsFrameworkIncludes }),
// 		babel({
// 			...babelCommonSettings,
// 			plugins: [[babelPluginJsxMeta, { framework: 'solid' }]],
// 			presets: [babelPresetSolid],
// 		}),
// 	],
// },
