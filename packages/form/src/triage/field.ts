// import { JsfText } from './../facades/text';
// import { debuggerInline } from './utils.js';
/* eslint-disable arrow-body-style */
/* eslint-disable max-lines */

import type { JSONSchema7 } from '@jsfe/types';

import type { Jsf } from '../json-schema-form.js';

import type { Widgets, Path, UiSchema } from '@jsfe/types';
import { html } from 'lit';

export const field = (
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
		return widgets?.callout?.(options) ?? html`${options.message}`;
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

		return widgets?.enumeration?.(options) || missing('enumeration');
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
		const options = {
			...baseOptions,
			value: baseValue ? String(baseValue) : '',

			minLength: schema.minLength,
			maxLength: schema.maxLength,
			pattern: schema.pattern,
		};

		if (uiOptions?.['ui:widget'] === 'textarea') {
			return widgets?.textarea?.(options) || missing('textarea');
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
