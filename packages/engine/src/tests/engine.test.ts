import type { JSONSchema7 } from 'json-schema';

import assert from 'node:assert';
import test, { describe } from 'node:test';

import type { CommonWidgetOptions } from '../types/form.js';

import { JsonSchemaFormEngine } from '../engine.js';

// Mock form element
class MockForm {
	constructor(public elements: MockFormField[] = []) {}
}

// Mock form field element
class MockFormField {
	constructor(
		public type: string,
		public name: string,
		public value: boolean | number | string = '',
		public checked = false,
		public valueAsNumber?: number,
	) {}

	getAttribute(name: string): null | string {
		if (name === 'name') return this.name;
		return null;
	}
}

void describe('JSONSchemaFormEngine', () => {
	void test('Basic initialization', () => {
		const schema: JSONSchema7 = {
			properties: {
				name: {
					title: 'Name',
					type: 'string',
				},
			},
			type: 'object',
		};
		const data = { name: 'John' };
		const form = new JsonSchemaFormEngine(schema, {}, data);

		assert.deepStrictEqual(form.data, data, 'Initial data should match');
		assert.deepStrictEqual(form.schema, schema, 'Schema should match');
		assert.deepStrictEqual(form.ui, {}, 'UI schema should match');
	});

	void test('Field traversal and access', () => {
		const schema: JSONSchema7 = {
			properties: {
				address: {
					properties: {
						street: {
							title: 'Street',
							type: 'string',
						},
					},
					type: 'object',
				},
				age: {
					title: 'Age',
					type: 'number',
				},
				name: {
					title: 'Name',
					type: 'string',
				},
			},
			type: 'object',
		};
		const data = {
			address: { street: 'Main St' },
			age: 30,
			name: 'John',
		};
		const form = new JsonSchemaFormEngine(schema, {}, data);

		// Test root field
		const rootField = form.rootField;
		assert.strictEqual(
			rootField.widget,
			'Object',
			'Root should be an Object widget',
		);
		assert.strictEqual(
			rootField.pathAsString,
			'__root',
			'Root path should be __root',
		);

		// Test field access by path
		const fields = form.field as Record<string, CommonWidgetOptions>;
		assert.ok(fields.__root, 'Root field should be accessible');
		assert.ok(fields.name, 'Name field should be accessible');
		assert.ok(fields.age, 'Age field should be accessible');
		assert.ok(fields.address, 'Address field should be accessible');
		assert.ok(fields['address.street'], 'Nested field should be accessible');
	});

	void test('Form event handling', () => {
		const schema: JSONSchema7 = {
			properties: {
				age: {
					type: 'number',
				},
				isActive: {
					type: 'boolean',
				},
				name: {
					type: 'string',
				},
			},
			type: 'object',
		};
		const form = new JsonSchemaFormEngine(schema);

		// Test text input
		const textInput = new MockFormField('text', 'name', 'Jane');
		const textEvent = {
			target: textInput,
			type: 'input',
		} as unknown as InputEvent;
		form.handleFormEvent(textEvent);
		assert.strictEqual(form.data.name, 'Jane', 'Text input should update data');

		// Test checkbox
		const checkbox = new MockFormField('checkbox', 'isActive', '', true);
		const checkboxEvent = {
			target: checkbox,
			type: 'input',
		} as unknown as InputEvent;
		form.handleFormEvent(checkboxEvent);
		assert.strictEqual(form.data.isActive, true, 'Checkbox should update data');

		// Test number input with coercion
		const numberInput = new MockFormField('number', 'age', '25', false, 25);
		const numberEvent = {
			target: numberInput,
			type: 'input',
		} as unknown as InputEvent;
		form.handleFormEvent(numberEvent, true);
		assert.strictEqual(
			form.data.age,
			25,
			'Number input should update data with coercion',
		);
	});

	// void test('Array field handling', () => {
	// 	const schema: JSONSchema7 = {
	// 		type: 'object',
	// 		properties: {
	// 			users: {
	// 				type: 'array',
	// 				items: {
	// 					type: 'object',
	// 					properties: {
	// 						name: { type: 'string' },
	// 						email: { type: 'string' },
	// 					},
	// 				},
	// 			},
	// 		},
	// 	};

	// 	const form = new JSONSchemaFormEngine(schema);
	// 	const fields = form.field as Record<string, CommonWidgetOptions>;

	// 	// Check root field
	// 	const rootField = fields['users'];
	// 	assert.ok(rootField, 'Array field should exist');
	// 	assert.strictEqual(rootField.widget, 'Array', 'Should be an Array widget');

	// 	// Check array field properties
	// 	const arrayField = rootField as ArrayWidgetOptions;
	// 	assert.ok(arrayField.controls.add, 'Should have add control');

	// 	// Check array item fields
	// 	assert.ok(
	// 		fields['users.0.name'],
	// 		'Array item name field should be accessible',
	// 	);
	// 	assert.ok(
	// 		fields['users.0.email'],
	// 		'Array item email field should be accessible',
	// 	);
	// });

	// void test('Array primitive with enum', () => {
	// 	const schema: JSONSchema7 = {
	// 		type: 'object',
	// 		properties: {
	// 			colors: {
	// 				type: 'array',
	// 				items: {
	// 					type: 'string',
	// 					enum: ['red', 'green', 'blue'],
	// 				},
	// 			},
	// 		},
	// 	};

	// 	const data = { colors: ['red', 'blue'] };
	// 	const form = new JSONSchemaFormEngine(schema, {}, data);
	// 	const fields = form.field as Record<string, CommonWidgetOptions>;

	// 	// Check root field
	// 	const rootField = fields['colors'];
	// 	assert.ok(rootField, 'Array field should exist');

	// 	// Check enum field properties
	// 	const enumField = rootField as EnumWidgetOptions;
	// 	assert.strictEqual(
	// 		enumField.widget,
	// 		'CheckboxGroup',
	// 		'Should be a CheckboxGroup widget',
	// 	);
	// 	assert.deepStrictEqual(
	// 		enumField.value,
	// 		['red', 'blue'],
	// 		'Value should match data',
	// 	);
	// 	assert.deepStrictEqual(
	// 		enumField.enum,
	// 		['red', 'green', 'blue'],
	// 		'Should have correct enum options',
	// 	);
	// });

	void test('Fixed length array', () => {
		const schema: JSONSchema7 = {
			items: [{ type: 'string' }, { type: 'number' }],
			maxItems: 2,
			minItems: 2,
			type: 'array',
		};
		const data = ['test', 42];
		const form = new JsonSchemaFormEngine(schema, {}, data);

		const fields = form.field as Record<string, CommonWidgetOptions>;
		assert.ok(fields.__root, 'Array field should be accessible');
		assert.ok(fields['0'], 'First item should be accessible');
		assert.ok(fields['1'], 'Second item should be accessible');
		assert.strictEqual(
			fields['0'].widget,
			'Text',
			'First item should be text widget',
		);
		assert.strictEqual(
			fields['1'].widget,
			'Number',
			'Second item should be number widget',
		);
	});

	void test('Form submission', () => {
		const schema: JSONSchema7 = {
			properties: {
				name: {
					type: 'string',
				},
			},
			type: 'object',
		};
		const data = { name: 'John' };
		const form = new JsonSchemaFormEngine(schema, {}, data);

		const nameInput = new MockFormField('text', 'name', 'John');
		const mockForm = new MockForm([nameInput]);

		let submitFired = false;
		form.addEventListener('submit', () => {
			submitFired = true;
		});

		const submitEvent = {
			preventDefault: () => {
				/* no-op */
			},
			target: mockForm,
			type: 'submit',
		} as unknown as SubmitEvent;

		const result = form.handleFormSubmit(submitEvent);
		assert.ok(submitFired, 'Submit event should fire');
		assert.deepStrictEqual(
			result.json,
			data,
			'Should return current form data',
		);
	});

	// void test('Schema references handling', () => {
	// 	const schema: JSONSchema7 = {
	// 		type: 'object',
	// 		definitions: {
	// 			address: {
	// 				type: 'object',
	// 				properties: {
	// 					street: {
	// 						type: 'string',
	// 					},
	// 				},
	// 			},
	// 		},
	// 		properties: {
	// 			homeAddress: {
	// 				$ref: '#/definitions/address',
	// 			},
	// 			workAddress: {
	// 				$ref: '#/definitions/address',
	// 			},
	// 		},
	// 	};
	// 	const form = new JSONSchemaFormEngine(schema);

	// 	const fields = form.field as Record<string, CommonWidgetOptions>;
	// 	assert.ok(fields['homeAddress'], 'Referenced field should be accessible');
	// 	assert.ok(
	// 		fields['homeAddress.street'],
	// 		'Nested referenced field should be accessible',
	// 	);
	// 	assert.ok(fields['workAddress'], 'Multiple references should work');
	// 	assert.ok(
	// 		fields['workAddress.street'],
	// 		'Multiple nested references should work',
	// 	);
	// });
});
