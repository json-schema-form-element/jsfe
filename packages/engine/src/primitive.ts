// import { Logger } from '@jsfe/engine/logger';

import type {
	BooleanInputAttributes,
	DateInputAttributes,
	EnumWidgetOptions,
	NumberInputAttributes,
	PrimitiveWidgetOptions,
	StringInputAttributes,
	WidgetTypeBaseParameters,
} from './types/form.js';

import {
	getLabelFromSchemaOrPath,
	makeIdFromPath,
} from './utils/object-paths.js';

// const log = new Logger();

export function widgetPrimitive(
	parameters: WidgetTypeBaseParameters,
): PrimitiveWidgetOptions {
	const { data, schema, uiSchema } = parameters;
	const options = createBaseOptions(parameters);

	// Handle enum types first
	if (
		schema.enum &&
		typeof schema.type === 'string' &&
		['integer', 'number', 'string'].includes(schema.type)
	) {
		return createEnumWidget(options, schema, uiSchema);
	}

	// Handle date/time types
	if (schema.format && ['date', 'date-time', 'time'].includes(schema.format)) {
		return createDateWidget(options, schema, data);
	}

	// Handle primitive types
	switch (schema.type) {
		case 'boolean': {
			return createBooleanWidget(options, uiSchema);
		}
		case 'integer':
		case 'number': {
			return createNumberWidget(options, schema, uiSchema, data);
		}
		case 'string': {
			return createStringWidget(options, schema, uiSchema, data);
		}
		default: {
			return options;
		}
	}
}

function createBaseOptions({
	data,
	form,
	level,
	path,
	required,
	schema,
	uiSchema,
}: WidgetTypeBaseParameters): PrimitiveWidgetOptions {
	const baseValue =
		(typeof data === 'string' ||
		typeof data === 'number' ||
		typeof data === 'boolean'
			? data
			: undefined) ??
		(typeof schema.default === 'string' ||
		typeof schema.default === 'number' ||
		typeof schema.default === 'boolean'
			? schema.default
			: undefined);

	const label = getLabelFromSchemaOrPath({ path, schema, uiSchema });
	const dotPath = path.join('.');

	return {
		classes: {},
		form,
		helpText:
			uiSchema['ui:help'] ??
			uiSchema['ui:description'] ??
			schema.description ??
			'',
		html: {
			disabled: uiSchema['ui:disabled'] ?? false,
			id: makeIdFromPath(dotPath),
			name: dotPath,
			placeholder: uiSchema['ui:placeholder'],
			readonly: uiSchema['ui:readonly'] ?? false,
			required,
		},
		label,
		level,
		path,
		pathAsString: dotPath,
		schema,
		value: baseValue,
		widget: null,
	};
}

function createBooleanWidget(
	options: PrimitiveWidgetOptions,
	uiSchema: WidgetTypeBaseParameters['uiSchema'],
): PrimitiveWidgetOptions<BooleanInputAttributes> {
	const booleanOptions: PrimitiveWidgetOptions<BooleanInputAttributes> = {
		...options,
		html: {
			...options.html,
			element: 'input',
			type: 'checkbox',
			value: options.value === undefined ? undefined : Boolean(options.value),
		},
	};

	switch (uiSchema['ui:widget']) {
		case 'Button': {
			booleanOptions.html.type = null;
			booleanOptions.widget = 'ButtonGroupBoolean';
			break;
		}
		case 'Radio': {
			booleanOptions.html.type = 'radio';
			booleanOptions.widget = 'RadioGroupBoolean';
			break;
		}
		case 'Switch': {
			booleanOptions.widget = 'Switch';
			break;
		}
		default: {
			booleanOptions.widget = 'Checkbox';
		}
	}

	return booleanOptions;
}

function createDateWidget(
	options: PrimitiveWidgetOptions,
	schema: WidgetTypeBaseParameters['schema'],
	data: WidgetTypeBaseParameters['data'],
): PrimitiveWidgetOptions<DateInputAttributes> {
	const type =
		schema.format === 'date-time'
			? 'datetime-local'
			: (schema.format as DateInputAttributes['type']);

	const dateOptions: PrimitiveWidgetOptions<DateInputAttributes> = {
		...options,
		html: {
			...options.html,
			element: 'input',
			type,
			value: typeof data === 'string' ? data : undefined,
		},
		value: typeof options.value === 'string' ? options.value : undefined,
		widget: 'Date',
	};

	return dateOptions;
}

function createEnumWidget(
	options: PrimitiveWidgetOptions,
	schema: WidgetTypeBaseParameters['schema'],
	uiSchema: WidgetTypeBaseParameters['uiSchema'],
): EnumWidgetOptions {
	const enumOptions: EnumWidgetOptions = {
		...options,
		enum: undefined,
		html: {
			...options.html,
			element: 'select',
			value: undefined,
		},
		type: undefined,
	};

	switch (typeof schema.enum?.[0]) {
		case 'number': {
			enumOptions.enum = schema.enum.filter((item) => typeof item === 'number');
			break;
		}
		case 'string': {
			enumOptions.enum = schema.enum.filter((item) => typeof item === 'string');
			break;
		}
	}

	if (uiSchema['ui:widget'] === 'Radio') enumOptions.widget = 'RadioGroup';
	else if (uiSchema['ui:widget'] === 'Button')
		enumOptions.widget = 'ButtonGroup';
	else enumOptions.widget = 'Select';

	return enumOptions;
}

function createNumberWidget(
	options: PrimitiveWidgetOptions,
	schema: WidgetTypeBaseParameters['schema'],
	uiSchema: WidgetTypeBaseParameters['uiSchema'],
	data: WidgetTypeBaseParameters['data'],
): PrimitiveWidgetOptions<NumberInputAttributes> {
	const numberOptions: PrimitiveWidgetOptions<NumberInputAttributes> = {
		...options,
		html: {
			...options.html,
			element: 'input',
			type: 'number',
			value: typeof data === 'number' ? data : undefined,
		},
	};

	if (schema.multipleOf) {
		numberOptions.html.step = schema.multipleOf;
	} else if (schema.type === 'integer') {
		numberOptions.html.step = 1;
	} else {
		numberOptions.html.step = 'any';
	}

	numberOptions.html.min = schema.minimum;
	numberOptions.html.max = schema.maximum;

	if (uiSchema['ui:widget'] === 'Range') {
		numberOptions.widget = 'Range';
		numberOptions.html.type = 'range';
	} else if (uiSchema['ui:widget'] === 'Rating') {
		numberOptions.widget = 'Rating';
	} else {
		numberOptions.widget = 'Number';
		numberOptions.html.type = 'number';
	}

	return numberOptions;
}

function createStringWidget(
	options: PrimitiveWidgetOptions,
	schema: WidgetTypeBaseParameters['schema'],
	uiSchema: WidgetTypeBaseParameters['uiSchema'],
	data: WidgetTypeBaseParameters['data'],
): PrimitiveWidgetOptions<StringInputAttributes> {
	const stringOptions: PrimitiveWidgetOptions<StringInputAttributes> = {
		...options,
		html: {
			...options.html,
			element: 'input',
			type: 'text',
			value: typeof data === 'string' ? data : undefined,
		},
	};

	if (uiSchema['ui:widget'] === 'Textarea') {
		stringOptions.html.element = 'textarea';
		stringOptions.widget = 'Textarea';
	} else if (uiSchema['ui:widget'] === 'ColorPicker') {
		stringOptions.html.element = 'input';
		stringOptions.widget = 'ColorPicker';
	} else {
		stringOptions.html.element = 'input';
		stringOptions.widget = 'Text';
		stringOptions.html.type = 'text';
	}

	if (['email', 'password', 'url'].includes(schema.format ?? '')) {
		stringOptions.html.type = schema.format as StringInputAttributes['type'];
	}
	if (uiSchema['ui:widget'] === 'Password') {
		stringOptions.html.type = 'password';
	}
	if (uiSchema['ui:options']?.inputType === 'tel') {
		stringOptions.html.type = 'tel';
	}

	stringOptions.html.minLength = schema.minLength;
	stringOptions.html.maxLength = schema.maxLength;
	stringOptions.html.pattern = schema.pattern;

	return stringOptions;
}
