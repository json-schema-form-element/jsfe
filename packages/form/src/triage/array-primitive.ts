import { html } from 'lit';

import type { Jsf } from '../json-schema-form.js';
import type { Widgets, Path, UiSchema, JSONSchema7 } from '@jsfe/types';

export const fieldArrayPrimitive = (
	schema: JSONSchema7,
	dataLevel: unknown,
	path: Path,
	uiState: unknown,
	uiOptions: UiSchema,
	required: boolean,
	handleChange: Jsf['_handleChange'],
	// dig: Jsf['_dig'],
	schemaPath: Path,
	widgets: Widgets,
	level = 0,
) => {
	// if (!Array.isArray(dataLevel)) return html``;

	const id = path.join('.');
	function missing(widgetName: string) {
		const options = { id, message: `Missing ${widgetName} widget.` };
		return widgets?.callout?.(options) ?? html`<p>${options.message}</p>`;
	}

	const helpText =
		schema.description ?? (uiOptions?.['ui:help'] as string) ?? '';

	// NOTE: Unused for now. Too noisy?
	// let itemsLabel: string | undefined;
	// if (
	// 	typeof schema.items === 'object' &&
	// 	!Array.isArray(schema.items) &&
	// 	schema.items.title
	// ) {
	// 	itemsLabel = schema.items.title;
	// }

	// options.value ||= [];
	// if (!Array.isArray(options.value)) return;

	const items = schema.items;
	if (typeof items !== 'object' || Array.isArray(items)) return;

	const valueChangedCallback = (enumValue: (string | number)[]) => {
		const schemaPathAugmented = [
			...schemaPath,
			'items',
			'enum',
			// FIXME:
			// enumValue.at(-1),
		];
		handleChange(path, enumValue, schemaPathAugmented);
	};

	const disabled = uiOptions?.['ui:disabled'] || false;

	const options = {
		label: schema.title,
		helpText,

		value: dataLevel ?? schema?.default,
		enum: items.enum,

		disabled,

		// itemsLabel,

		level,

		id,
		// required,
		valueChangedCallback,
	};

	if (uiOptions?.['ui:widget'] === 'select') {
		return widgets?.selectMultiple?.(options) || missing('multi select');
	}

	return widgets?.checkboxGroup?.(options) || missing('array primitive');
};
