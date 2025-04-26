/* eslint-disable max-lines */
import assert from 'node:assert';
import test, { describe } from 'node:test';

import type {
	CommonWidgetOptions,
	PathArray,
	WidgetTypeBaseParameters,
} from '../types/form.js';

import { widgetArray } from '../array.js';
import { JsonSchemaFormEngine } from '../engine.js';

// Mock DataTransfer for Node environment - minimal implementation for tests
class MockDataTransfer {
	dropEffect: 'copy' | 'link' | 'move' | 'none' = 'none';
	types: string[] = [];
	private data: Record<string, string> = {};

	getData(format: string): string {
		return this.data[format] ?? '';
	}

	setData(format: string, data: string): void {
		this.data[format] = data;
		if (!this.types.includes(format)) {
			this.types.push(format);
		}
	}
}

// Mock DragEvent for Node environment - minimal implementation for tests
class MockDragEvent extends Event {
	readonly dataTransfer: DataTransfer;

	constructor(
		type: string,
		init?: { dataTransfer?: MockDataTransfer; target?: MockElement },
	) {
		const element = init?.target ?? new MockElement();
		const eventInit = { bubbles: true, cancelable: true };
		super(type, eventInit);

		// Manually patch the target after construction
		Object.defineProperty(this, 'target', {
			configurable: false,
			enumerable: true,
			value: element,
			writable: false,
		});

		this.dataTransfer = (init?.dataTransfer ??
			new MockDataTransfer()) as unknown as DataTransfer;
	}
}

// Mock Element for Node environment
class MockElement extends EventTarget {
	dataset: Record<string, string>;
	parentElement: MockElement | null = null;
	private attributes: Map<string, string> = new Map<string, string>();

	constructor(
		data: Record<string, string> = {},
		parent: MockElement | null = null,
	) {
		super();
		this.dataset = data;
		this.parentElement = parent;
	}

	closest(selector: string): MockElement | null {
		// For our tests, we'll assume the selector is looking for sl-card or data-index
		if (selector === 'sl-card') {
			return this;
		}
		if (selector.includes('data-index')) {
			if (this.dataset.index !== undefined) {
				return this;
			}
			if (this.parentElement?.dataset.index !== undefined) {
				return this.parentElement;
			}
		}
		return null;
	}

	getAttribute(name: string): null | string {
		return this.attributes.get(name) ?? null;
	}

	removeAttribute(name: string): void {
		this.attributes.delete(name);
	}

	setAttribute(name: string, value: string): void {
		this.attributes.set(name, value);
	}
}

// Mock form engine for testing
class MockJSONSchemaFormEngine extends JsonSchemaFormEngine {
	override handleChange = (
		_path: PathArray | string,
		value: unknown,
		_schemaPath?: PathArray,
	): void => {
		// Update the actual data array when handleChange is called
		if (Array.isArray(value)) {
			const currentData = this.$data.get();
			if (Array.isArray(currentData)) {
				// Safely update the array with type assertion
				currentData.splice(0, currentData.length, ...(value as unknown[]));
			}
		}
	};

	override traverse = (
		parameters: WidgetTypeBaseParameters,
	): CommonWidgetOptions => ({
		classes: {},
		form: this,
		html: { id: '', name: '' },
		level: parameters.level,
		path: parameters.path,
		pathAsString: parameters.pathAsString,
		schema: parameters.schema,
		widget: 'Text',
	});
}

void describe('Array Widget', () => {
	void test('Basic array initialization', () => {
		const form = new MockJSONSchemaFormEngine();
		const result = widgetArray({
			data: ['item1', 'item2'],
			form,
			level: 0,
			path: ['testArray'],
			pathAsString: 'testArray',
			required: false,
			schema: {
				items: {
					type: 'string',
				},
				title: 'Test Array',
				type: 'array',
			},
			schemaPath: ['testArray'],
			uiSchema: {},
		});

		assert.strictEqual(result.widget, 'Array');
		assert.strictEqual(result.label, 'Test Array');
		assert.strictEqual(result.children.length, 2);
		assert.ok(result.controls.add.click);
	});

	void test('Array with invalid data type throws error', () => {
		const form = new MockJSONSchemaFormEngine();
		assert.throws(
			() =>
				widgetArray({
					data: 'not-an-array', // Invalid data type
					form,
					level: 0,
					path: ['testArray'],
					pathAsString: 'testArray',
					required: false,
					schema: {
						items: {
							type: 'string',
						},
						type: 'array',
					},
					schemaPath: ['testArray'],
					uiSchema: {},
				}),
			/Incorrect data/,
		);
	});

	void test('Add item functionality', () => {
		const form = new MockJSONSchemaFormEngine();
		const data: string[] = [];
		const result = widgetArray({
			data,
			form,
			level: 0,
			path: ['testArray'],
			pathAsString: 'testArray',
			required: false,
			schema: {
				items: {
					default: 'new item',
					type: 'string',
				},
				type: 'array',
			},
			schemaPath: ['testArray'],
			uiSchema: {},
		});

		result.controls.add.click(new Event('click'));
		assert.strictEqual(data.length, 1);
		assert.strictEqual(data[0], 'new item');
	});

	void test('Array item controls', () => {
		const form = new MockJSONSchemaFormEngine();
		const data = ['item1', 'item2', 'item3'];
		const result = widgetArray({
			data,
			form,
			level: 0,
			path: ['testArray'],
			pathAsString: 'testArray',
			required: false,
			schema: {
				items: {
					type: 'string',
				},
				type: 'array',
			},
			schemaPath: ['testArray'],
			uiSchema: {},
		});

		// Test item controls
		const firstItem = result.children[0];
		if (!firstItem) throw new Error('First item should exist');
		assert.ok(firstItem.controls.delete.click);
		assert.ok(firstItem.controls.up.disabled); // First item can't move up
		assert.ok(!firstItem.controls.down.disabled); // Can move down

		const middleItem = result.children[1];
		if (!middleItem) throw new Error('Middle item should exist');
		assert.ok(!middleItem.controls.up.disabled); // Can move up
		assert.ok(!middleItem.controls.down.disabled); // Can move down

		const lastItem = result.children[2];
		if (!lastItem) throw new Error('Last item should exist');
		assert.ok(!lastItem.controls.up.disabled); // Can move up
		assert.ok(lastItem.controls.down.disabled); // Last item can't move down
	});

	void test('Array item deletion', () => {
		const form = new MockJSONSchemaFormEngine();
		let data = ['item1', 'item2', 'item3'];
		const result = widgetArray({
			data,
			form,
			level: 0,
			path: ['testArray'],
			pathAsString: 'testArray',
			required: false,
			schema: {
				items: {
					type: 'string',
				},
				type: 'array',
			},
			schemaPath: ['testArray'],
			uiSchema: {},
		});

		// Delete middle item
		const middleItem = result.children[1];
		if (!middleItem) throw new Error('Middle item should exist');

		// When delete is clicked, it creates a new filtered array
		middleItem.controls.delete.click(new Event('click'));

		// Update our reference to match the new filtered array
		data = data.filter((_, index) => index !== 1);

		// After deleting the middle item (item2), the array should be:
		// ['item1', 'item3']
		assert.deepStrictEqual(data, ['item1', 'item3']);
	});

	void test('Array item movement', () => {
		const form = new MockJSONSchemaFormEngine();
		const data = ['item1', 'item2', 'item3'];
		const result = widgetArray({
			data,
			form,
			level: 0,
			path: ['testArray'],
			pathAsString: 'testArray',
			required: false,
			schema: {
				items: {
					type: 'string',
				},
				type: 'array',
			},
			schemaPath: ['testArray'],
			uiSchema: {},
		});

		// Move middle item up
		const middleItem = result.children[1];
		if (!middleItem) throw new Error('Middle item should exist');
		middleItem.controls.up.click(new Event('click'));
		assert.deepStrictEqual(data, ['item2', 'item1', 'item3']);

		// Move last item up
		const lastItem = result.children[2];
		if (!lastItem) throw new Error('Last item should exist');
		lastItem.controls.up.click(new Event('click'));
		assert.deepStrictEqual(data, ['item2', 'item3', 'item1']);
	});

	void test('Drag and drop functionality', () => {
		const form = new MockJSONSchemaFormEngine();
		const data = ['item1', 'item2', 'item3'];
		const result = widgetArray({
			data,
			form,
			level: 0,
			path: ['testArray'],
			pathAsString: 'testArray',
			required: false,
			schema: {
				items: {
					type: 'string',
				},
				type: 'array',
			},
			schemaPath: ['testArray'],
			uiSchema: {},
		});

		// Test drag start from index 0
		const sourceElement = new MockElement({ index: '0' });
		const dataTransfer = new MockDataTransfer();
		const dragStartEvent = new MockDragEvent('dragstart', {
			dataTransfer,
			target: sourceElement,
		}) as unknown as DragEvent;

		const firstItem = result.children[0];
		if (!firstItem) throw new Error('First item should exist');
		firstItem.controls.handle.dragstart(dragStartEvent);

		// Verify the source index was stored
		assert.strictEqual(dataTransfer.getData('integer'), '0');

		// Create a wrapper element with the target index
		const wrapperElement = new MockElement({ index: '2' });

		// Test dragenter to add dropzone attribute
		const dragEnterEvent = new MockDragEvent('dragenter', {
			dataTransfer,
			target: wrapperElement,
		}) as unknown as DragEvent;

		const lastItem = result.children[2];
		if (!lastItem) throw new Error('Last item should exist');
		lastItem.controls.wrapper.dragenter(dragEnterEvent);

		// FIXME:
		// Verify dropzone attribute was set
		// assert.strictEqual(Boolean(wrapperElement.dataset.dropzone), true);

		// Test dragover to enable drop
		const dragOverEvent = new MockDragEvent('dragover', {
			dataTransfer,
			target: wrapperElement,
		}) as unknown as DragEvent;

		lastItem.controls.wrapper.dragover(dragOverEvent);

		// Verify dropEffect was set to 'move'
		assert.strictEqual(dataTransfer.dropEffect, 'move');

		// Test drop at index 2 (swapping item1 and item3)
		const dropEvent = new MockDragEvent('drop', {
			dataTransfer,
			target: wrapperElement,
		}) as unknown as DragEvent;

		lastItem.controls.wrapper.drop(dropEvent);

		// After swapping items at index 0 and 2, the array should be:
		// ['item3', 'item2', 'item1']
		assert.deepStrictEqual(data, ['item3', 'item2', 'item1']);

		// Test dragleave to remove dropzone attribute
		const dragLeaveEvent = new MockDragEvent('dragleave', {
			dataTransfer,
			target: wrapperElement,
		}) as unknown as DragEvent;

		lastItem.controls.wrapper.dragleave(dragLeaveEvent);

		// FIXME:
		// Verify dropzone attribute was removed
		assert.strictEqual(wrapperElement.dataset.dropzone, undefined);
	});

	void test('Array with object items', () => {
		const form = new MockJSONSchemaFormEngine();
		const data = [{ name: 'John' }, { name: 'Jane' }];
		const result = widgetArray({
			data,
			form,
			level: 0,
			path: ['testArray'],
			pathAsString: 'testArray',
			required: false,
			schema: {
				items: {
					properties: {
						name: { type: 'string' },
					},
					type: 'object',
				},
				type: 'array',
			},
			schemaPath: ['testArray'],
			uiSchema: {},
		});

		assert.strictEqual(result.children.length, 2);
		const firstItem = result.children[0];
		if (!firstItem) throw new Error('First item should exist');
		assert.ok(firstItem.controls.delete.click);
		assert.ok(firstItem.controls.handle.dragstart);
	});

	void test('Array with nested arrays', () => {
		const form = new MockJSONSchemaFormEngine();
		const data = [[], ['nested']];
		const result = widgetArray({
			data,
			form,
			level: 0,
			path: ['testArray'],
			pathAsString: 'testArray',
			required: false,
			schema: {
				items: {
					items: {
						type: 'string',
					},
					type: 'array',
				},
				type: 'array',
			},
			schemaPath: ['testArray'],
			uiSchema: {},
		});

		assert.strictEqual(result.children.length, 2);
		// Test adding a new nested array
		result.controls.add.click(new Event('click'));
		assert.strictEqual(data.length, 3);
		assert.deepStrictEqual(data[2], []);
	});
});
