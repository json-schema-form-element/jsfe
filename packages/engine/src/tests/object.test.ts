import assert from 'node:assert';
import test, { describe } from 'node:test';

import type {
	ObjectWidgetOptions,
	PrimitiveWidgetOptions,
} from '../types/form.js';

import { JsonSchemaFormEngine } from '../engine.js';
import { widgetObject } from '../object.js';

void describe('Object', () => {
	void test('Object field group', () => {
		const form = new JsonSchemaFormEngine();
		const result = widgetObject({
			data: {},
			form,
			level: 0,
			path: ['ObjectFoo'],
			pathAsString: 'ObjectFoo',
			required: false,
			schema: {
				description: 'My Object Field Group desc',
				properties: {
					String1: {
						type: 'string',
					},
				},
				title: 'My Object Field Group',
				type: 'object',
			},
			schemaPath: ['ObjectFoo'], // NOTE: Is it correctly used? Can't remember.

			uiSchema: {},
		});

		assert.deepStrictEqual(result, {
			classes: {},
			fields: [
				{
					classes: {},
					element: 'input',
					form,
					helpText: '',
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
					label: 'String1',
					level: 1,
					path: ['ObjectFoo', 'String1'],
					pathAsString: 'ObjectFoo.String1',
					schema: {
						type: 'string',
					},
					widget: 'Text',
				},
			],
			form,
			helpText: 'My Object Field Group desc',
			html: {
				'aria-describedby': 'ObjectFoo__description',
				'aria-description': 'My Object Field Group desc',
				element: 'fieldset',
				id: 'ObjectFoo',
				name: 'ObjectFoo',
			},
			label: 'My Object Field Group',
			level: 0,
			path: ['ObjectFoo'],
			pathAsString: 'ObjectFoo',
			schema: {
				description: 'My Object Field Group desc',
				properties: {
					String1: {
						type: 'string',
					},
				},
				title: 'My Object Field Group',
				type: 'object',
			},
			widget: 'Object',
		});
	});

	void test('Wrong object field group', () => {
		const form = new JsonSchemaFormEngine();
		const result = widgetObject({
			data: {},
			form,
			level: 0,
			path: ['ObjectFoo'],
			pathAsString: 'ObjectFoo',
			required: false,
			schema: {},
			schemaPath: ['ObjectFoo'], // NOTE: Is it correctly used? Can't remember.

			uiSchema: {},
		});

		assert.deepStrictEqual(result, {
			classes: {},
			fields: [],
			form,
			helpText: 'Wrong object field',
			html: {
				disabled: false,
				element: 'fieldset',
				id: '',
				name: '',
				readonly: false,
				required: false,
			},
			label: 'Wrong object field',
			level: 0,
			path: [],
			pathAsString: '__error',
			schema: {},
			widget: 'Error',
		});
	});

	void test('Required object field group', () => {
		const form = new JsonSchemaFormEngine();
		const result = widgetObject({
			data: { String1: 'test' },
			form,
			level: 0,
			path: ['ObjectFoo'],
			pathAsString: 'ObjectFoo',
			required: true,
			schema: {
				properties: {
					String1: {
						type: 'string',
					},
				},
				required: ['String1'],
				title: 'Required Object',
				type: 'object',
			},
			schemaPath: ['ObjectFoo'],
			uiSchema: {},
		});

		assert.ok(result.fields[0], 'First child should exist');
		assert.strictEqual(
			result.html.name,
			'ObjectFoo',
			'Object should have correct name',
		);
		assert.strictEqual(
			result.html.id,
			'ObjectFoo',
			'Object should have correct id',
		);
		assert.strictEqual(
			result.fields[0].widget,
			'Text',
			'Child should be a text field',
		);
	});

	void test('Object with custom UI schema', () => {
		const form = new JsonSchemaFormEngine();
		const result = widgetObject({
			data: {},
			form,
			level: 0,
			path: ['ObjectFoo'],
			pathAsString: 'ObjectFoo',
			required: false,
			schema: {
				properties: {
					String1: {
						type: 'string',
					},
				},
				type: 'object',
			},
			schemaPath: ['ObjectFoo'],
			uiSchema: {
				'ui:disabled': true,
				'ui:readonly': true,
			},
		});

		assert.ok(result.fields[0], 'First child should exist');
		assert.strictEqual(
			result.html.name,
			'ObjectFoo',
			'Object should have correct name',
		);
		assert.strictEqual(
			result.html.id,
			'ObjectFoo',
			'Object should have correct id',
		);
		assert.strictEqual(
			result.fields[0].widget,
			'Text',
			'Child should be a text field',
		);
	});

	void test('Nested object structure', () => {
		const form = new JsonSchemaFormEngine();
		const result = widgetObject({
			data: {
				nested: {
					String1: 'test',
				},
			},
			form,
			level: 0,
			path: ['ObjectFoo'],
			pathAsString: 'ObjectFoo',
			required: false,
			schema: {
				properties: {
					nested: {
						properties: {
							String1: {
								type: 'string',
							},
						},
						type: 'object',
					},
				},
				type: 'object',
			},
			schemaPath: ['ObjectFoo'],
			uiSchema: {},
		});

		const nestedObject = result.fields[0] as ObjectWidgetOptions;
		assert.ok(nestedObject, 'First child should exist');
		assert.strictEqual(nestedObject.widget, 'Object');
		assert.strictEqual(
			nestedObject.html.name,
			'ObjectFoo.nested',
			'Nested object should have correct name',
		);

		const nestedField = nestedObject.fields[0] as PrimitiveWidgetOptions;
		assert.ok(nestedField, 'Nested child should exist');
		assert.strictEqual(nestedField.widget, 'Text');
		assert.strictEqual(nestedField.html.value, 'test');
	});
});
