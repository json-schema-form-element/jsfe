import type {
	ArrayPrimitiveWidgetOptions,
	PrimitiveArray,
	WidgetTypeBaseParameters,
} from './types/form.js';

import { makeIdFromPath } from './utils/object-paths.js';
import { getPrimitiveArray } from './utils/utilities.js';

/**
 * Generates widget options for an array of primitives field based on the
 * provided schema, data, path, and UI state.
 *
 * @returns The options for rendering the array of primitives field widget.
 */
export function widgetArrayPrimitive({
	data,
	form,
	level = 0,
	path,
	required,
	schema,
	uiSchema,
}: WidgetTypeBaseParameters): ArrayPrimitiveWidgetOptions {
	const value: PrimitiveArray =
		getPrimitiveArray(data) ??
		getPrimitiveArray(schema.default) ??
		([] as PrimitiveArray);

	const pathAsString = path.join('.');

	const helpText = schema.description ?? uiSchema['ui:help'] ?? '';

	const items = schema.items;
	if (typeof items !== 'object' || Array.isArray(items)) {
		const error = 'Wrong object field';
		// TODO: Make an error type.
		return {
			classes: {},
			form,
			helpText: error,
			html: {
				disabled: false,

				element: 'select',
				id: '',
				name: '',
				readonly: false,
				required: false,
			},
			label: error,
			level,
			path: [],
			pathAsString: pathAsString,
			schema,
			value,
			widget: 'Error',
		};
	}

	const disabled = uiSchema['ui:disabled'] ?? false;
	const label = uiSchema['ui:title'] ?? schema.title;
	const enumm =
		'type' in items && items.enum
			? // FIXME: Real assertion of what's inside, remove the casting.
				(items.enum as number[] | string[])
			: undefined;

	const options: ArrayPrimitiveWidgetOptions = {
		classes: {},
		enum: enumm,
		form,
		helpText,
		html: {
			disabled,
			element: 'select',
			id: makeIdFromPath(pathAsString),
			name: pathAsString,
			required,
		},
		label,
		level,
		path,
		pathAsString,
		schema,
		value,

		widget: 'CheckboxGroup',
	};

	if (uiSchema['ui:widget'] === 'SelectMultiple')
		options.widget = 'SelectMultiple';

	return options;
}
