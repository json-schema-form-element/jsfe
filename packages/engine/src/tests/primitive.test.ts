/* eslint-disable max-lines */
import type { JSONSchema7 } from 'json-schema';

import assert from 'node:assert';
import test, { describe } from 'node:test';

import type {
	BooleanInputAttributes,
	DateInputAttributes,
	EnumWidgetOptions,
	NumberInputAttributes,
	PrimitiveWidgetOptions,
	TextareaAttributes,
	TextInputAttributes,
} from '../types/form.js';

import { JsonSchemaFormEngine } from '../engine.js';
import { widgetPrimitive } from '../primitive.js';

void describe('Primitives', () => {
	void test('Text input - should generate correct widget configuration', () => {
		const form = new JsonSchemaFormEngine();
		const result = widgetPrimitive({
			data: undefined,
			form,
			level: 0,
			path: ['ObjectFoo', 'String1'],
			pathAsString: 'ObjectFoo.String1',
			required: false,
			schema: {
				description: 'My Text Field desc',
				title: 'My Text Field',
				type: 'string',
			},
			schemaPath: ['ObjectFoo', 'String1'],
			uiSchema: {},
		});

		assert.deepStrictEqual(result, {
			classes: {},
			element: 'input',
			form,
			helpText: 'My Text Field desc',
			html: {
				disabled: false,
				id: 'ObjectFoo__String1',
				maxlength: undefined,
				minlength: undefined,
				name: 'ObjectFoo.String1',
				pattern: undefined,
				placeholder: undefined,
				readonly: false,
				required: false,
				type: 'text',
				value: undefined,
			},
			label: 'My Text Field',
			level: 0,
			path: ['ObjectFoo', 'String1'],
			pathAsString: 'ObjectFoo.String1',
			schema: {
				description: 'My Text Field desc',
				title: 'My Text Field',
				type: 'string',
			},
			widget: 'Text',
		});
	});

	void test('Number input - should generate correct widget configuration', () => {
		const form = new JsonSchemaFormEngine();
		const result = widgetPrimitive({
			data: undefined,
			form,
			level: 0,
			path: ['ObjectFoo', 'Number1'],
			pathAsString: 'ObjectFoo.Number1',
			required: false,
			schema: {
				description: 'My Number Field desc',
				title: 'My Number Field',
				type: 'number',
			},
			schemaPath: ['ObjectFoo', 'Number1'],
			uiSchema: {},
		});

		assert.deepStrictEqual(result, {
			classes: {},
			element: 'input',
			form,
			helpText: 'My Number Field desc',
			html: {
				disabled: false,
				id: 'ObjectFoo__Number1',
				max: undefined,
				min: undefined,
				name: 'ObjectFoo.Number1',
				placeholder: undefined,
				readonly: false,
				required: false,
				step: 'any',
				type: 'number',
				value: undefined,
			},
			label: 'My Number Field',
			level: 0,
			path: ['ObjectFoo', 'Number1'],
			pathAsString: 'ObjectFoo.Number1',
			schema: {
				description: 'My Number Field desc',
				title: 'My Number Field',
				type: 'number',
			},
			widget: 'Number',
		});
	});

	void test('Boolean input - should support different widget types', () => {
		const form = new JsonSchemaFormEngine();
		const baseSchema: JSONSchema7 = {
			description: 'My Boolean Field desc',
			title: 'My Boolean Field',
			type: 'boolean',
		};
		const basePath = ['ObjectFoo', 'Boolean1'];

		// Test checkbox (default)
		const checkboxResult = widgetPrimitive({
			data: undefined,
			form,
			level: 0,
			path: basePath,
			pathAsString: 'ObjectFoo.Boolean1',
			required: false,
			schema: baseSchema,
			schemaPath: basePath,
			uiSchema: {},
		}) as PrimitiveWidgetOptions<BooleanInputAttributes>;

		assert.strictEqual(checkboxResult.widget, 'Checkbox');
		assert.strictEqual(checkboxResult.html.type, 'checkbox');

		// Test switch widget
		const switchResult = widgetPrimitive({
			data: undefined,
			form,
			level: 0,
			path: basePath,
			pathAsString: 'ObjectFoo.Boolean1',
			required: false,
			schema: baseSchema,
			schemaPath: basePath,
			uiSchema: { 'ui:widget': 'Switch' },
		}) as PrimitiveWidgetOptions<BooleanInputAttributes>;

		assert.strictEqual(switchResult.widget, 'Switch');
		assert.strictEqual(switchResult.html.type, 'checkbox');

		// Test radio widget
		const radioResult = widgetPrimitive({
			data: undefined,
			form,
			level: 0,
			path: basePath,
			pathAsString: 'ObjectFoo.Boolean1',
			required: false,
			schema: baseSchema,
			schemaPath: basePath,
			uiSchema: { 'ui:widget': 'Radio' },
		}) as PrimitiveWidgetOptions<BooleanInputAttributes>;

		assert.strictEqual(radioResult.widget, 'RadioGroupBoolean');
		assert.strictEqual(radioResult.html.type, 'radio');
	});

	void test('String input - should support different formats and widgets', () => {
		const form = new JsonSchemaFormEngine();
		const basePath = ['ObjectFoo', 'String1'];

		// Test password format
		const passwordResult = widgetPrimitive({
			data: undefined,
			form,
			level: 0,
			path: basePath,
			pathAsString: 'ObjectFoo.String1',
			required: false,
			schema: {
				format: 'password',
				title: 'Password Field',
				type: 'string',
			},
			schemaPath: basePath,
			uiSchema: {},
		}) as PrimitiveWidgetOptions<TextInputAttributes>;

		assert.strictEqual(passwordResult.html.type, 'password');

		// Test email format
		const emailResult = widgetPrimitive({
			data: undefined,
			form,
			level: 0,
			path: basePath,
			pathAsString: 'ObjectFoo.String1',
			required: false,
			schema: {
				format: 'email',
				title: 'Email Field',
				type: 'string',
			},
			schemaPath: basePath,
			uiSchema: {},
		}) as PrimitiveWidgetOptions<TextInputAttributes>;

		assert.strictEqual(emailResult.html.type, 'email');

		// Test textarea widget
		const textareaResult = widgetPrimitive({
			data: undefined,
			form,
			level: 0,
			path: basePath,
			pathAsString: 'ObjectFoo.String1',
			required: false,
			schema: {
				title: 'Textarea Field',
				type: 'string',
			},
			schemaPath: basePath,
			uiSchema: { 'ui:widget': 'Textarea' },
		}) as PrimitiveWidgetOptions<TextareaAttributes>;

		assert.strictEqual(textareaResult.widget, 'Textarea');
		assert.strictEqual(textareaResult.element, 'textarea');
	});

	void test('Date/time input - should support different formats', () => {
		const form = new JsonSchemaFormEngine();
		const basePath = ['ObjectFoo', 'Date1'];

		// Test date format
		const dateResult = widgetPrimitive({
			data: undefined,
			form,
			level: 0,
			path: basePath,
			pathAsString: 'ObjectFoo.Date1',
			required: false,
			schema: {
				format: 'date',
				title: 'Date Field',
				type: 'string',
			},
			schemaPath: basePath,
			uiSchema: {},
		}) as PrimitiveWidgetOptions<DateInputAttributes>;

		assert.strictEqual(dateResult.widget, 'Date');
		assert.strictEqual(dateResult.html.type, 'date');

		// Test datetime-local format
		const dateTimeResult = widgetPrimitive({
			data: undefined,
			form,
			level: 0,
			path: basePath,
			pathAsString: 'ObjectFoo.Date1',
			required: false,
			schema: {
				format: 'date-time',
				title: 'DateTime Field',
				type: 'string',
			},
			schemaPath: basePath,
			uiSchema: {},
		}) as PrimitiveWidgetOptions<DateInputAttributes>;

		assert.strictEqual(dateTimeResult.widget, 'Date');
		assert.strictEqual(dateTimeResult.html.type, 'datetime-local');
	});

	void test('Number input - should support different widgets and constraints', () => {
		const form = new JsonSchemaFormEngine();
		const basePath = ['ObjectFoo', 'Number1'];

		// Test range widget
		const rangeResult = widgetPrimitive({
			data: undefined,
			form,
			level: 0,
			path: basePath,
			pathAsString: 'ObjectFoo.Number1',
			required: false,
			schema: {
				maximum: 100,
				minimum: 0,
				title: 'Range Field',
				type: 'number',
			},
			schemaPath: basePath,
			uiSchema: { 'ui:widget': 'Range' },
		}) as PrimitiveWidgetOptions<NumberInputAttributes>;

		assert.strictEqual(rangeResult.widget, 'Range');
		assert.strictEqual(rangeResult.html.min, 0);
		assert.strictEqual(rangeResult.html.max, 100);

		// Test integer with step
		const integerResult = widgetPrimitive({
			data: undefined,
			form,
			level: 0,
			path: basePath,
			pathAsString: 'ObjectFoo.Number1',
			required: false,
			schema: {
				multipleOf: 5,
				title: 'Integer Field',
				type: 'integer',
			},
			schemaPath: basePath,
			uiSchema: {},
		}) as PrimitiveWidgetOptions<NumberInputAttributes>;

		assert.strictEqual(integerResult.html.step, 5);
	});

	void test('Enum input - should support different widgets', () => {
		const form = new JsonSchemaFormEngine();
		const basePath = ['ObjectFoo', 'Enum1'];
		const enumSchema: JSONSchema7 = {
			enum: ['option1', 'option2', 'option3'],
			title: 'Enum Field',
			type: 'string',
		};

		// Test select widget (default)
		const selectResult = widgetPrimitive({
			data: undefined,
			form,
			level: 0,
			path: basePath,
			pathAsString: 'ObjectFoo.Enum1',
			required: false,
			schema: enumSchema,
			schemaPath: basePath,
			uiSchema: {},
		}) as EnumWidgetOptions;

		assert.strictEqual(selectResult.widget, 'Select');
		assert.deepStrictEqual(selectResult.enum, [
			'option1',
			'option2',
			'option3',
		]);

		// Test radio widget
		const radioResult = widgetPrimitive({
			data: undefined,
			form,
			level: 0,
			path: basePath,
			pathAsString: 'ObjectFoo.Enum1',
			required: false,
			schema: enumSchema,
			schemaPath: basePath,
			uiSchema: { 'ui:widget': 'Radio' },
		}) as EnumWidgetOptions;

		assert.strictEqual(radioResult.widget, 'RadioGroup');
		assert.deepStrictEqual(radioResult.enum, ['option1', 'option2', 'option3']);
	});

	void test('Enum select - should apply schema default when no data', () => {
		const form = new JsonSchemaFormEngine();
		const result = widgetPrimitive({
			data: undefined,
			form,
			level: 0,
			path: ['Enum1'],
			pathAsString: 'Enum1',
			required: false,
			schema: {
				default: 1000,
				enum: [10, 100, 1000, 10_000],
				title: 'Number list',
				type: 'number',
			},
			schemaPath: ['Enum1'],
			uiSchema: {},
		}) as EnumWidgetOptions;

		assert.strictEqual(result.widget, 'Select');
		assert.strictEqual(result.value, 1000, 'top-level value');
		assert.strictEqual(result.html.value, 1000, 'html.value');
	});

	void test('Enum select - should apply schema default with empty object data', () => {
		const form = new JsonSchemaFormEngine();
		const result = widgetPrimitive({
			data: {},
			form,
			level: 0,
			path: ['Enum1'],
			pathAsString: 'Enum1',
			required: false,
			schema: {
				default: 1000,
				enum: [10, 100, 1000, 10_000],
				title: 'Number list',
				type: 'number',
			},
			schemaPath: ['Enum1'],
			uiSchema: {},
		}) as EnumWidgetOptions;

		assert.strictEqual(result.value, 1000, 'top-level value');
		assert.strictEqual(result.html.value, 1000, 'html.value');
	});

	void test('Enum radio - should apply schema default', () => {
		const form = new JsonSchemaFormEngine();
		const result = widgetPrimitive({
			data: undefined,
			form,
			level: 0,
			path: ['Enum1'],
			pathAsString: 'Enum1',
			required: false,
			schema: {
				default: 1000,
				enum: [10, 100, 1000, 10_000],
				title: 'Number radios',
				type: 'number',
			},
			schemaPath: ['Enum1'],
			uiSchema: { 'ui:widget': 'Radio' },
		}) as EnumWidgetOptions;

		assert.strictEqual(result.widget, 'RadioGroup');
		assert.strictEqual(result.value, 1000);
		assert.strictEqual(result.html.value, 1000);
	});

	void test('Enum select - user data should override schema default', () => {
		const form = new JsonSchemaFormEngine();
		const result = widgetPrimitive({
			data: 100,
			form,
			level: 0,
			path: ['Enum1'],
			pathAsString: 'Enum1',
			required: false,
			schema: {
				default: 1000,
				enum: [10, 100, 1000, 10_000],
				title: 'Number list',
				type: 'number',
			},
			schemaPath: ['Enum1'],
			uiSchema: {},
		}) as EnumWidgetOptions;

		assert.strictEqual(result.value, 100);
		assert.strictEqual(result.html.value, 100);
	});

	void test('Enum select - string default', () => {
		const form = new JsonSchemaFormEngine();
		const result = widgetPrimitive({
			data: undefined,
			form,
			level: 0,
			path: ['Enum1'],
			pathAsString: 'Enum1',
			required: false,
			schema: {
				default: 'Averell',
				enum: ['Joe', 'William', 'Jack', 'Averell'],
				title: 'String list',
				type: 'string',
			},
			schemaPath: ['Enum1'],
			uiSchema: {},
		}) as EnumWidgetOptions;

		assert.strictEqual(result.value, 'Averell');
		assert.strictEqual(result.html.value, 'Averell');
	});
});
