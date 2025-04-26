import type { JSONSchema7 } from 'json-schema';

import assert from 'node:assert';
import test, { describe } from 'node:test';

import { widgetArrayPrimitive } from '../array-primitive.js';
import { JsonSchemaFormEngine } from '../engine.js';

void describe('Array Primitives', () => {
	void test('String array - should generate correct widget configuration', () => {
		const form = new JsonSchemaFormEngine();
		const result = widgetArrayPrimitive({
			data: ['option1'],
			form,
			level: 0,
			path: ['ObjectFoo', 'StringArray1'],
			pathAsString: 'ObjectFoo.StringArray1',
			required: false,
			schema: {
				description: 'Select multiple strings',
				items: {
					enum: ['option1', 'option2', 'option3'],
					type: 'string',
				},
				title: 'My String Array',
				type: 'array',
				uniqueItems: true,
			},
			schemaPath: ['ObjectFoo', 'StringArray1'],
			uiSchema: {},
		});

		assert.deepStrictEqual(result, {
			classes: {},
			enum: ['option1', 'option2', 'option3'],
			form,
			helpText: 'Select multiple strings',
			html: {
				disabled: false,
				element: 'select',
				id: 'ObjectFoo__StringArray1',
				name: 'ObjectFoo.StringArray1',
				required: false,
				// type: 'checkbox',
				// maxLength: undefined,
				// minLength: undefined,
				// pattern: undefined,
			},
			label: 'My String Array',
			level: 0,
			path: ['ObjectFoo', 'StringArray1'],
			pathAsString: 'ObjectFoo.StringArray1',
			schema: {
				description: 'Select multiple strings',
				items: {
					enum: ['option1', 'option2', 'option3'],
					type: 'string',
				},
				title: 'My String Array',
				type: 'array',
				uniqueItems: true,
			},
			value: ['option1'],
			widget: 'CheckboxGroup',
		});
	});

	void test('Number array - should generate correct widget configuration', () => {
		const form = new JsonSchemaFormEngine();
		const result = widgetArrayPrimitive({
			data: [1],
			form,
			level: 0,
			path: ['ObjectFoo', 'NumberArray1'],
			pathAsString: 'ObjectFoo.NumberArray1',
			required: false,
			schema: {
				description: 'Select multiple numbers',
				items: {
					enum: [1, 2, 3],
					type: 'number',
				},
				title: 'My Number Array',
				type: 'array',
				uniqueItems: true,
			},
			schemaPath: ['ObjectFoo', 'NumberArray1'],
			uiSchema: {},
		});

		assert.deepStrictEqual(result, {
			classes: {},
			enum: [1, 2, 3],
			form,
			helpText: 'Select multiple numbers',
			html: {
				disabled: false,
				element: 'select',
				id: 'ObjectFoo__NumberArray1',
				name: 'ObjectFoo.NumberArray1',
				required: false,
			},
			label: 'My Number Array',
			level: 0,
			path: ['ObjectFoo', 'NumberArray1'],
			pathAsString: 'ObjectFoo.NumberArray1',
			schema: {
				description: 'Select multiple numbers',
				items: {
					enum: [1, 2, 3],
					type: 'number',
				},
				title: 'My Number Array',
				type: 'array',
				uniqueItems: true,
			},
			value: [1],
			widget: 'CheckboxGroup',
		});
	});

	void test('Array with select widget - should use SelectMultiple widget', () => {
		const form = new JsonSchemaFormEngine();
		const result = widgetArrayPrimitive({
			data: undefined,
			form,
			level: 0,
			path: ['ObjectFoo', 'Array1'],
			pathAsString: 'ObjectFoo.Array1',
			required: false,
			schema: {
				items: {
					enum: ['option1', 'option2', 'option3'],
					type: 'string',
				},
				title: 'My Array',
				type: 'array',
				uniqueItems: true,
			},
			schemaPath: ['ObjectFoo', 'Array1'],
			uiSchema: { 'ui:widget': 'SelectMultiple' },
		});

		assert.strictEqual(result.widget, 'SelectMultiple');
	});

	void test('Invalid array schema - should return error widget', () => {
		const form = new JsonSchemaFormEngine();
		const result = widgetArrayPrimitive({
			data: undefined,
			form,
			level: 0,
			path: ['ObjectFoo', 'Array1'],
			pathAsString: 'ObjectFoo.Array1',
			required: false,
			schema: {
				items: 'invalid',
				type: 'array',
			} as unknown as JSONSchema7,
			schemaPath: ['ObjectFoo', 'Array1'],
			uiSchema: {},
		});

		assert.strictEqual(result.widget, 'Error');
		assert.strictEqual(result.label, 'Wrong object field');
		assert.strictEqual(result.helpText, 'Wrong object field');
	});
});
