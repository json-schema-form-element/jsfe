import { defineConfig } from 'vite';
import { cemPluginDefaultOptions } from '@gracile-labs/jsx/vite';
import { generateLitTypes } from '@gracile-labs/jsx/cem/index';
import { literalsHtmlCssMinifier } from '@literals/rollup-plugin-html-css-minifier';
import manifest from '@shoelace-style/shoelace/dist/custom-elements.json' with { type: 'json' };
import Inspect from 'vite-plugin-inspect';
import { gracile } from '@gracile/gracile/plugin';
import { marked } from 'marked';
import markedShiki from 'marked-shiki';
import { litShikiLanguages } from '@gracile/doc/lib/markdown-old/tm-grammars/lit.js';
import { createHighlighter, type ShikiTransformer } from 'shiki';
// import {
//   transformerNotationDiff,
//   transformerNotationHighlight,
//   transformerNotationWordHighlight,
//   transformerNotationFocus,
//   transformerNotationErrorLevel,
//   transformerMetaHighlight,
//   transformerMetaWordHighlight,
// } from '@shikijs/transformers';
import terser from '@rollup/plugin-terser';

// import { babel } from '@rollup/plugin-babel';
// FIXME:
// import babelPluginProposalDecorators from '@babel/plugin-proposal-decorators';
// import babelPluginSyntaxTypescript from '@babel/plugin-syntax-typescript';
// import strip from '@rollup/plugin-strip';
// import vue from '@vitejs/plugin-vue';
// import react from '@vitejs/plugin-react';
// import { svelte } from '@sveltejs/vite-plugin-svelte';

import { viteMarkdownPlugin } from '@gracile/markdown/vite';
import { MarkdownRenderer } from '@gracile/markdown-preset-marked';

import * as common from './vite.common.js';
// import { viteStaticCopy } from 'vite-plugin-static-copy';
import { customElementsManifestToMarkdown } from '@custom-elements-manifest/to-markdown';
import fs from 'fs';

generateLitTypes(manifest, {
  ...cemPluginDefaultOptions,
  fileName: 'jsx-vendor.d.ts',
});

function generateCemDocs() {
  const manifest = JSON.parse(
    fs.readFileSync('./dist/custom-elements.json', 'utf-8'),
  );
  const markdown = customElementsManifestToMarkdown(manifest, {
    private: 'hidden',
    omitDeclarations: [
      'mixins',
      'variables',
      'functions',
      'exports',
      'super-class',
    ],
    omitSections: ['mixins', 'super-class'],
    // headingOffset: 0,
    // private: 'details',
  });

  fs.writeFileSync('./custom-elements.md', markdown);
}

generateCemDocs();

export default defineConfig(async ({ mode }) => {
  console.log("'Mode", mode);
  return {
    server: { watch: { usePolling: false } },
    resolve: common.resolve,

    build: {
      target: 'esnext',
      sourcemap: true,
      outDir: 'dist-site',
    },

    plugins: [
      common.babelConfig,

      Inspect(),

      common.gracileJsxConfig,
      gracile(),

      common.staticCopy(mode),
      // viteStaticCopy({
      //   targets: [
      //     {
      //       src: 'docs',
      //       dest: 'api',
      //     },
      //   ],
      // }),

      await mdConfig(),

      mode === 'production' ? terser() : null,
      mode === 'production' ? literalsHtmlCssMinifier() : null,

      // vue(),
      // react({ exclude: ['**/*.el.*'] }),
      // svelte(),
    ],
  };
});

const highlighter = await createHighlighter({
  langs: [
    'md',
    'js',
    'ts',
    'tsx',
    'vue',
    'sh',
    'css',
    'scss',
    ...litShikiLanguages,
  ],
  themes: ['github-dark-default'],
});

function transformerFileNames(): ShikiTransformer {
  return {
    line(hast) {
      const comment = '// @filename: ';

      const fileNameCommentLine = hast.children.find(
        (e) =>
          e?.type === 'element' &&
          e?.children?.some(
            (e2) => e2?.type === 'text' && e2?.value?.startsWith(comment),
          ),
      );
      if (fileNameCommentLine?.type === 'element') {
        const elem = fileNameCommentLine.children.at(0);

        if (elem?.type !== 'text') return;

        const value = elem.value.replace(comment, '');

        hast.tagName = 'div';
        hast.properties = { class: 'file-title' };
        hast.children = [{ type: 'text', value }];
      }
    },
  };
}

async function mdConfig() {
  const _marked = marked
    // .use({
    //   walkTokens() {},
    // })
    .use(
      markedShiki({
        highlight(code, lang, props) {
          // console.log(code, lang);

          return highlighter.codeToHtml(code, {
            lang,
            theme: 'github-dark-default',
            meta: { __raw: props.join(' ') }, // required by `transformerMeta*`
            transformers: [
              // transformerNotationDiff(),
              // transformerNotationHighlight(),
              // transformerNotationWordHighlight(),
              // transformerNotationFocus(),
              // transformerNotationErrorLevel(),
              // transformerMetaHighlight(),
              // transformerMetaWordHighlight(),
              transformerFileNames(),
            ],
          });
        },
      }),
    );

  return [
    viteMarkdownPlugin({
      MarkdownRenderer,
      options: {
        markedInstance: _marked,
        collectCodeBlocks: true,
        post(infos) {
          // console.log({ infos });
        },
      },
    }),
  ];
}
