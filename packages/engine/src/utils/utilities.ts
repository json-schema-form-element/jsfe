import type { Primitive, PrimitiveArray } from '../types/form.js';

/**
 * Validates and returns a primitive value (string, number, or boolean)
 * @returns The value if it is a primitive type, undefined otherwise
 */
export function getPrimitive(value: unknown): Primitive {
	return typeof value === 'string' ||
		typeof value === 'number' ||
		typeof value === 'boolean'
		? value
		: undefined;
}

/**
 * Validates and returns an array of uniform primitives (string, number, or boolean)
 * @returns The array if all elements are of the same primitive type, undefined otherwise
 */
export function getPrimitiveArray(value: unknown): PrimitiveArray | undefined {
	if (!Array.isArray(value) || value.length === 0) return undefined;

	const firstType = typeof value[0];
	if (
		firstType !== 'string' &&
		firstType !== 'number' &&
		firstType !== 'boolean'
	)
		return undefined;

	if (value.every((item) => typeof item === firstType)) {
		return value as PrimitiveArray;
	}

	return undefined;
}
