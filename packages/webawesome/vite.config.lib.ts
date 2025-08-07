import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import { cemPluginDefaultOptions } from '@gracile-labs/jsx/vite';
import autoExternal from 'rollup-plugin-auto-external';
import { generateLitTypes } from '@gracile-labs/jsx/cem/index';
import { literalsHtmlCssMinifier } from '@literals/rollup-plugin-html-css-minifier';
import manifest from '@shoelace-style/shoelace/dist/custom-elements.json' with { type: 'json' };

import * as common from './vite.common.js';

generateLitTypes(manifest, {
  ...cemPluginDefaultOptions,
  fileName: 'jsx-vendor.d.ts',
});

export default defineConfig(({ mode }) => {
  console.log("'Mode", mode);
  return {
    resolve: common.resolve,

    build: {
      lib: {
        entry: [
          './src/lib/index.ts',
          './src/lib/themes/webawesome/index.ts',
          './src/lib/themes/webawesome/demo-nodes/index.ts',
          './src/lib/adapters/react.ts',
          // './src/lib/adapters/vue.ts',
        ],
        name: 'NodeFlowElements',
        formats: ['es'],
      },

      target: 'esnext',
      sourcemap: true,

      minify: false,

      rollupOptions: {
        output: { preserveModules: true },

        // NOTE: Needed because `auto-external` will not catch everything.
        external: [
          '@shoelace-style/shoelace/dist/components/menu/menu.js',
          '@shoelace-style/shoelace/dist/components/menu-item/menu-item.js',
          '@shoelace-style/shoelace/dist/components/divider/divider.js',
          '@shoelace-style/shoelace/dist/components/animation/animation.js',
          '@shoelace-style/shoelace/dist/components/icon-button/icon-button.js',
          '@shoelace-style/shoelace/dist/components/tag/tag.js',
          '@shoelace-style/shoelace/dist/components/tooltip/tooltip.js',
          '@shoelace-style/shoelace/dist/components/dropdown/dropdown.js',
          '@shoelace-style/shoelace/dist/components/menu/menu.js',
          '@shoelace-style/shoelace/dist/components/image-comparer/image-comparer.js',
          '@shoelace-style/shoelace/dist/components/details/details.js',
          '@shoelace-style/shoelace/dist/components/menu-label/menu-label.js',
          '@shoelace-style/shoelace/dist/components/copy-button/copy-button.js',
          '@shoelace-style/shoelace/dist/components/dialog/dialog.js',
          '@shoelace-style/shoelace/dist/components/textarea/textarea.js',
          '@shoelace-style/shoelace/dist/components/select/select.js',
          '@shoelace-style/shoelace/dist/components/option/option.js',
          '@shoelace-style/shoelace/dist/components/card/card.js',

          'clsx',
          'signal-polyfill',
          'signal-utils/subtle/reaction',
          '@gracile-labs/jsx/components/for',

          'lit/directives/ref.js',
          'lit/decorators.js',
          'lit/directives/unsafe-html.js',
          'lit/directives/class-map.js',
          'lit/directives/style-map.js',
          '@lit-labs/signals',
          '@lit-labs/motion',
          '@lit/context',
          'lit/directives/repeat.js',

          // TODO: Use regex
          // external: [/^lit\/.*/],

          'react',
          'vue',
        ],

        plugins: [autoExternal()],
      },
    },

    plugins: [
      dts({ entryRoot: './src/lib' }),

      common.staticCopy(mode),
      common.babelConfig,
      common.gracileJsxConfig,
      literalsHtmlCssMinifier(),
    ],
  };
});
