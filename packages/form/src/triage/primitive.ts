// import { JsfText } from './../facades/text';
// import { debuggerInline } from './utils.js';
/* eslint-disable arrow-body-style */
/* eslint-disable max-lines */

import type { JSONSchema7 } from '@jsfe/types';

import type { Jsf } from '../json-schema-form.js';

import type { Widgets, Path, UiSchema } from '@jsfe/types';
import { html } from 'lit';

export const fieldPrimitive = (
	schema: JSONSchema7,
	value: unknown,
	path: Path,
	uiOptions: UiSchema,
	required: boolean,
	handleChange: Jsf['_handleChange'],
	handleKeydown: Jsf['_handleKeydown'],
	schemaPath: Path,

	widgets: Widgets,
) => {
	const id = path.join('.');

	function missing(widgetName: string) {
		const options = { id, message: `Missing ${widgetName} widget.` };
		return widgets?.callout?.(options) ?? html`<p>${options.message}</p>`;
	}

	let label = '';

	if (schema.title) label = schema.title;
	else if (Number.isNaN(Number(path.at(-1)))) {
		label = String(path.at(-1));
	}

	const helpText =
		schema.description ?? (uiOptions?.['ui:help'] as string) ?? '';
	const placeholder = (uiOptions?.['ui:placeholder'] as string) ?? '';

	let baseValue: unknown;

	if (value !== undefined) {
		baseValue = value;
	} else if (
		typeof schema.default !== 'undefined' &&
		(typeof schema.default === 'string' ||
			typeof schema.default === 'number' ||
			schema.default == null ||
			typeof schema.default === 'boolean')
	) {
		baseValue = schema.default;

		// NOTE: could be batched? Or maybe debounced?
		handleChange([...path], schema.default, schemaPath);
	}

	// ----------------
	const valueChangedCallback = (newValue?: unknown) => {
		let finalValue = newValue;
		if (finalValue === '') {
			finalValue = undefined;
		}
		if (
			schema?.type?.includes('null') &&
			(typeof newValue === 'undefined' || newValue === '')
		) {
			finalValue = null;
		}
		handleChange(path, finalValue, schemaPath);
	};

	const baseOptions = {
		label,
		helpText,
		placeholder,
		valueChangedCallback,
		handleKeydown,
		id,
		required,
	};

	if (
		schema?.enum &&
		(schema.type === 'integer' ||
			schema.type === 'number' ||
			schema.type === 'string')
	) {
		const options = {
			...baseOptions,
			value: baseValue ? String(baseValue) : '',

			type: schema.type,
			enum: schema.enum,
		};

		if (uiOptions?.['ui:widget'] === 'radio') {
			return widgets?.radioGroup?.(options) || missing('radio group');
		}
		if (uiOptions?.['ui:widget'] === 'button') {
			return widgets?.buttonGroup?.(options) || missing('button group');
		}

		return widgets?.select?.(options) || missing('select');
	}

	if (schema.type === 'string' && uiOptions?.['ui:widget'] === 'color') {
		const options = {
			...baseOptions,
			value: baseValue ? String(baseValue) : '',
		};
		return widgets?.colorPicker?.(options) || missing('color picker');
	}

	if (
		schema.format === 'date' ||
		schema.format === 'date-time' ||
		schema.format === 'time'
	) {
		let type = schema.format;

		if (schema.format === 'date-time') {
			type = 'datetime-local';
		}
		const options = {
			...baseOptions,
			value: baseValue ? new Date(String(baseValue)) : undefined,
			type,
		};

		return widgets?.date?.(options) || missing('date');
	}

	if (schema.type === 'string') {
		let inputType = 'text';
		if (schema.format === 'password' || schema.format === 'email') {
			inputType = schema.format;
		}

		if (uiOptions?.['ui:options']?.inputType === 'tel') {
			inputType = 'tel';
		}
		const options = {
			...baseOptions,
			value: baseValue ? String(baseValue) : '',

			inputType,

			minLength: schema.minLength,
			maxLength: schema.maxLength,
			pattern: schema.pattern,
		};

		if (uiOptions?.['ui:widget'] === 'textarea') {
			return widgets?.textarea?.(options) || missing('textarea');
		}
		if (typeof uiOptions?.['ui:widget'] === 'string') {
			const customWidgetName = uiOptions?.['ui:widget'];
			return widgets?.[customWidgetName]?.(options) || missing('custom');
		}

		return widgets?.text?.(options) || missing('text');
	}

	if (schema.type === 'number' || schema.type === 'integer') {
		let step: number | undefined | 'any' = schema.multipleOf;
		if (typeof step === 'undefined') {
			if (schema.type?.includes('integer')) step = 1;
			if (schema.type?.includes('number')) step = 'any';
		}

		const options = {
			...baseOptions,
			value: typeof baseValue !== 'undefined' ? Number(baseValue) : undefined,

			min: schema.minimum,
			max: schema.maximum,
			step,
		};

		if (uiOptions?.['ui:widget'] === 'range') {
			return widgets?.range?.(options) || missing('range');
		}
		if (uiOptions?.['ui:widget'] === 'rating') {
			return widgets?.rating?.(options) || missing('rating');
		}

		return widgets?.number?.(options) || missing('number');
	}

	if (schema.type?.includes('boolean')) {
		const options = {
			...baseOptions,
			value: typeof baseValue !== 'undefined' ? Boolean(baseValue) : undefined,
		};

		if (uiOptions?.['ui:widget'] === 'switch') {
			return widgets?.switch?.(options) || missing('switch');
		}

		if (uiOptions?.['ui:widget'] === 'radio') {
			// TODO: trueLabel / falseLabel
			return (
				widgets?.radioGroupBoolean?.(options) || missing('radio group boolean')
			);
		}
		if (uiOptions?.['ui:widget'] === 'button') {
			// TODO: trueLabel / falseLabel
			return (
				widgets?.buttonGroupBoolean?.(options) ||
				missing('button group boolean')
			);
		}

		return widgets?.checkbox?.(options) || missing('boolean');
	}

	return missing(`Wrong input for: ${path.join('/')}`);
};

/* 

AJV-Formats
https://ajv.js.org/packages/ajv-formats.html

date: full-date according to RFC3339 (opens new window).
time: time (time-zone is mandatory).
date-time: date-time (time-zone is mandatory).
iso-time: time with optional time-zone.
iso-date-time: date-time with optional time-zone.
duration: duration from RFC3339(opens new window)
uri: full URI.
uri-reference: URI reference, including full and relative URIs.
uri-template: URI template according to RFC6570(opens new window)
url (deprecated): URL record (opens new window).
email: email address.
hostname: host name according to RFC1034 (opens new window).
ipv4: IP address v4.
ipv6: IP address v6.
regex: tests whether a string is a valid regular expression by passing it to RegExp constructor.
uuid: Universally Unique IDentifier according to RFC4122 (opens new window).
json-pointer: JSON-pointer according to RFC6901 (opens new window).
relative-json-pointer: relative JSON-pointer according to this draft (opens new window).
byte: base64 encoded data according to the openApi 3.0.0 specification(opens new window)
int32: signed 32 bits integer according to the openApi 3.0.0 specification(opens new window)
int64: signed 64 bits according to the openApi 3.0.0 specification(opens new window)
float: float according to the openApi 3.0.0 specification(opens new window)
double: double according to the openApi 3.0.0 specification(opens new window)
password: password string according to the openApi 3.0.0 specification(opens new window)
binary: binary string according to the openApi 3.0.0 specification

*/
