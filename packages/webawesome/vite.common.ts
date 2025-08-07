import babelPluginProposalDecorators from '@babel/plugin-proposal-decorators';
// import babelPluginSyntaxDecorators from '@babel/plugin-syntax-decorators';
import babelPluginSyntaxTypescript from '@babel/plugin-syntax-typescript';
// import babelPluginDecoratorTransforms from 'decorator-transforms';
import { gracileJsx } from '@gracile-labs/jsx/vite';

// import { customElementVuejsPlugin } from 'custom-element-vuejs-integration';
// import { customElementReactWrapperPlugin } from 'custom-element-react-wrappers';

import { babel } from '@rollup/plugin-babel';
import { viteStaticCopy } from 'vite-plugin-static-copy';

export const resolve = {
  alias: [
    {
      find: '@node-flow-elements/nfe',
      replacement: '/src/lib',
    },
  ],
};

export const babelConfig = babel({
  extensions: [/* '.js',  */ '.ts', '.tsx'],
  sourceType: 'unambiguous',
  babelHelpers: 'bundled', // NOTE: Explicit default.

  plugins: [
    [babelPluginSyntaxTypescript, { isTSX: true }],

    // babelPluginSyntaxDecorators,
    // TODO: Test this:
    // [babelPluginDecoratorTransforms, {}],
    // [
    //   'decorator-transforms',
    //   {
    //     runtime: {
    //       import: 'decorator-transforms/runtime',
    //     },
    //   },
    // ],
    [babelPluginProposalDecorators, { version: '2023-11' }],
  ],
});

export const staticCopy = (mode: string) =>
  viteStaticCopy({
    targets: [
      {
        src: 'node_modules/@shoelace-style/shoelace/dist/assets/icons/*.svg',
        dest: 'assets/icons',
      },
    ],
  });

export const gracileJsxConfig = gracileJsx({
  cemPlugin: {
    files: ['./src/**/*.el.{js,ts,jsx,tsx}'],
    plugins: [
      // customElementReactWrapperPlugin({
      //   modulePath(className, tagName) {
      //     console.log(className, tagName);
      //     return `../dist/${tagName.replace('nf-', '')}.el.js`;
      //   },
      // }) as any,
      // customElementVuejsPlugin({
      //   outdir: './vue',
      //   fileName: 'my-library-vuejs.d.ts',
      //   globalTypePath: '../components/index.js', // relative to `outdir`
      // }) as any,
    ],
  },
});
