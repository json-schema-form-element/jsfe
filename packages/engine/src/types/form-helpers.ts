import type { JsonSchemaFormEngine } from '../engine.js';
import type { ReadonlyJSONSchema7 } from './schema.js';
import type { UiSchema } from './ui-schema.js';
import type { Widgets } from './widgets.js';

/**
 * Supported form encoding types.
 */
export type EncType =
	| 'application/x-www-form-urlencoded'
	| 'multipart/form-data'
	| 'text/plain';

export interface GenericFormProperties<
	Schema extends ReadonlyJSONSchema7 | undefined = undefined,
	Ui extends UiSchema = UiSchema,
	Data = Record<number | string, unknown>,
	// FIXME: Using generics will crash TS (v8 out of memory)!
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	Form = JsonSchemaFormEngine<any, any, any>,
	// Form = JsonSchemaFormEngine<Schema, Ui, Data>,
> extends NativeFormAttributes {
	data?: Data;
	debug?: boolean;

	form?: Form;

	onBlur?: (form: Form, event: Event) => void;
	onChange?: (form: Form, event: Event | InputEvent) => void;

	onFocus?: (form: Form, event: FocusEvent) => void;

	onInput?: (form: Form, event: Event | InputEvent) => void;
	onReset?: (form: Form, event: Event) => void;
	onSubmit?: (form: Form, event: SubmitEvent) => void;

	schema?: Schema;
	ui?: Ui;
	widgets?: Partial<Widgets>;
}

/**
 * Mirrors native HTML `<form>` specific attributes.
 * Align to JS property names.
 * Custom Element attribute handlers can convert special cases like
 * `accept-charset`.
 */
export interface NativeFormAttributes {
	/** Character encoding for the form submission. */
	// 'accept-charset'?: string;
	acceptCharset?: string;
	// acceptCharset?: string;
	/** URL where the form data will be sent. */
	action?: string;
	/** Whether the form should have autocomplete enabled. */
	autoComplete?: 'off' | 'on';
	/** Encoding type for the form data. */
	encType?: EncType;
	/** HTTP method to use for form submission. */
	method?: 'dialog' | 'get' | 'post';
	/** Name of the form. */
	name?: string;
	/** Whether to bypass form validation. */
	noValidate?: boolean;
	/** Target window/frame for form submission. */
	target?: string;
}

/**
 * Represents a custom element tag name.
 */
export type TagName = `${string}-${string}`;
