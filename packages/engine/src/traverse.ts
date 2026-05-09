/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
import type { JSONSchema7 } from 'json-schema';

import { Logger } from '@jsfe/engine/logger';

import type {
	CommonWidgetOptions,
	ObjectWidgetOptions,
	WidgetTypeBaseParameters,
} from './types/form.js';

import { widgetArrayPrimitive } from './array-primitive.js';
import { widgetArray } from './array.js';
import { widgetObject } from './object.js';
import { widgetPrimitive } from './primitive.js';

const log = new Logger();

/**
 * Detects if the schema represents an object type
 */
export function isArray({ items, type }: JSONSchema7): boolean {
	return type === 'array' && typeof items === 'object';
}

/**
 * Detects if the schema represents an array of primitives
 */
export function isArrayOfPrimitives({
	items,
	type,
	uniqueItems,
}: JSONSchema7): boolean {
	return Boolean(
		type === 'array' &&
		typeof items === 'object' &&
		!Array.isArray(items) &&
		items.enum &&
		uniqueItems &&
		(items.type === 'string' ||
			items.type === 'number' ||
			items.type === 'integer' ||
			items.type === 'boolean'),
	);
}

/**
 * Detects if the schema represents a fixed array
 */
export function isFixedArray({ items, type }: JSONSchema7): boolean {
	return type === 'array' && Array.isArray(items);
}

/**
 * Detects if the schema represents an object type
 */
export function isObject({ allOf, properties }: JSONSchema7): boolean {
	return Boolean(properties ?? allOf);
}

/**
 * Detects if the schema represents a primitive type
 */
export function isPrimitive({ format, type }: JSONSchema7): boolean {
	return Boolean(
		type?.includes('boolean') ||
		type?.includes('string') ||
		type?.includes('integer') ||
		format === 'date' ||
		format === 'date-time' ||
		type?.includes('number'),
	);
}

/**
 * Traverses the schema and returns appropriate widget options
 */
export function traverse(
	options: WidgetTypeBaseParameters,
): CommonWidgetOptions {
	const { schema: rawSchema } = options;
	const schema = rawSchema as JSONSchema7;

	if (isPrimitive(schema)) return widgetPrimitive(options);

	if (isObject(schema)) return widgetObject(options);

	if (isArrayOfPrimitives(schema)) return widgetArrayPrimitive(options);

	if (isArray(schema)) {
		if (isFixedArray(schema)) return createFixedArrayWidget(options);

		if (isArrayWithEnumItems(schema)) return widgetArrayPrimitive(options);

		return widgetArray(options);
	}

	log.error('No widget found', { schema });

	return createErrorWidget(options);
}

/**
 * Creates an error widget with the given options
 */
function createErrorWidget(
	options: WidgetTypeBaseParameters,
): CommonWidgetOptions {
	return {
		...options,
		classes: {},
		html: { id: 'Error', name: 'Error' },
		widget: 'Error',
	};
}

/**
 * Creates widget options for a fixed array schema
 */
function createFixedArrayWidget(
	options: WidgetTypeBaseParameters,
): ObjectWidgetOptions {
	const newNode: JSONSchema7 = {
		properties: {},
		type: 'array',
	};

	// Convert array items to object properties
	if (Array.isArray(options.schema.items)) {
		newNode.properties ??= {};
		for (const [index, entry] of options.schema.items.entries()) {
			newNode.properties[index] = entry;
		}
	}

	return widgetObject({
		...options,
		schema: newNode,
		schemaPath: [...options.schemaPath, 'items'],
	});
}

/**
 * Detects if the schema represents an array with enum items
 */
function isArrayWithEnumItems({ items, type }: JSONSchema7): boolean {
	return Boolean(
		type === 'array' &&
		typeof items === 'object' &&
		!Array.isArray(items) &&
		items.enum &&
		(items.type === 'string' || items.type === 'number'),
	);
}

// const { schema: rawSchema, schemaPath } = parameters;
// const rootSchema = parameters.form.schema as JSONSchema7 | undefined;
// const schema = resolveReference(rawSchema as JSONSchema7, rootSchema ?? {});
// /**
//  * Resolves schema references if present
//  */
// function resolveReference(
// 	schema: JSONSchema7,
// 	rootSchema: JSONSchema7,
// ): JSONSchema7 {
// 	// Handle direct schema references
// 	if (schema.$ref?.startsWith('#/definitions/')) {
// 		const reference = schema.$ref.split('/')[2];
// 		if (reference && rootSchema.definitions?.[reference]) {
// 			return rootSchema.definitions[reference] as JSONSchema7;
// 		}
// 	}

// 	// Handle references in array items
// 	if (
// 		schema.type === 'array' &&
// 		typeof schema.items === 'object' &&
// 		!Array.isArray(schema.items) &&
// 		schema.items.$ref?.startsWith('#/definitions/')
// 	) {
// 		const reference = schema.items.$ref.split('/')[2];
// 		if (reference && rootSchema.definitions?.[reference]) {
// 			return {
// 				...schema,
// 				items: rootSchema.definitions[reference] as JSONSchema7,
// 			};
// 		}
// 	}

// 	return schema;
// }
