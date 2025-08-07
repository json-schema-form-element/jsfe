import type { GenericFormProperties } from '@jsfe/engine';

export interface Attributes {
	debug?: boolean;
	// test: 123;
}

/**
 * @example
 * /// <reference types="@gracile-labs/css-helpers/ambient" />
 *
 * declare global {
 *   declare module 'react' {
 *     namespace JSX {
 *       interface IntrinsicElements extends CssHelpers {}
 *     }
 *   }
 * }
 *
 * type CssHelpers = import('@gracile-labs/css-helpers/types').JsxTags;
 *
 */
export interface FormElements {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	'jsf-generic': GenericFormProperties<any, any, any>;
}

export const TAG_NAME = 'jsf-generic';
export type TagName = typeof TAG_NAME;
