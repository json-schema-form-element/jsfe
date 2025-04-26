import type {
	CommonWidgetOptions,
	ObjectWidgetOptions,
	PathArray,
	WidgetTypeBaseParameters,
} from './types/form.js';

import {
	getChildUiSchema,
	getLabelFromSchemaOrPath,
	makeIdFromPath,
} from './utils/object-paths.js';

/**
 * Generates widget options for an object field based on the provided schema,
 * data, path, and UI state.
 *
 * @returns The options for rendering the object field widget.
 */
export function widgetObject({
	data,
	form,
	level = 0,
	path,
	schema,
	schemaPath,
	uiSchema,
}: WidgetTypeBaseParameters): ObjectWidgetOptions {
	const error = 'Wrong object field';
	if (typeof schema.properties !== 'object') {
		return {
			children: [],
			classes: {},
			form,
			helpText: error,
			html: {
				disabled: false,
				element: 'fieldset',
				id: '',
				name: '',
				readonly: false,
				required: false,
			},
			label: error,
			level,
			path: [],
			pathAsString: '__error',
			schema,
			widget: 'Error',
		};
	}

	const children: CommonWidgetOptions[] = [];
	for (const [propertyName, propertyValue] of Object.entries(
		schema.properties,
	)) {
		if (Array.isArray(propertyValue) || typeof propertyValue === 'boolean')
			continue;

		const childData: unknown =
			data && typeof data === 'object' && propertyName in data
				? data[propertyName as keyof typeof data]
				: {};
		const childPath: PathArray = [...path, propertyName];

		const required = schema.required?.includes(propertyName) ?? false;

		const schemaPathAugmented: PathArray = [...schemaPath, propertyName];

		children.push(
			form.traverse({
				data: childData,
				form,
				level: level + 1,
				path: childPath,
				pathAsString: childPath.join('.'),
				required,
				schema: propertyValue,
				schemaPath: schemaPathAugmented,
				uiSchema: getChildUiSchema(uiSchema, propertyName),
			}),
		);
	}
	const label = getLabelFromSchemaOrPath({ path, schema, uiSchema });

	const description = schema.description ?? uiSchema['ui:description'];

	let pathAsString: string = path.map(String).join('.');
	if (pathAsString === '') pathAsString = '__root';

	const options: ObjectWidgetOptions = {
		children,
		classes: {},
		form,
		helpText: description,
		html: {
			'aria-describedby': `${pathAsString}__description`,
			'aria-description': description,
			element: 'fieldset',
			id: makeIdFromPath(pathAsString),
			name: pathAsString,
		},
		label,
		level,
		path,
		pathAsString,
		schema,
		widget: 'Object',
	};

	return options;
}
