import type { PathArray } from '../types/form.js';
import type { ReadonlyJSONSchema7 } from '../types/schema.js';
import type { UiSchema } from '../types/ui-schema.js';

const unsafeKeys = ['__proto__', 'prototype', 'constructor'] as const;
type UnsafeKey = (typeof unsafeKeys)[number];

/**
 * Returns true if a string represents a numeric value.
 */
function isNumeric(value: string): boolean {
	return !Number.isNaN(Number(value));
}

/**
 * Determines whether a value is a plain object (excluding null).
 */
function isUnknownObject(
	value: unknown,
): value is Record<number | string, unknown> {
	return typeof value === 'object' && value !== null;
}

/**
 * Checks if a key is unsafe for object traversal (e.g. prototype pollution).
 */
function isUnsafeKey(key: string): key is UnsafeKey {
	return unsafeKeys.includes(key as UnsafeKey);
}

/**
 * Validates a path string for safe object access.
 * Allows alphanumeric keys, brackets, dots, underscores, and dollar signs.
 */
function isValidPath(path: string): boolean {
	// eslint-disable-next-line sonarjs/duplicates-in-character-class
	return /^[\w$.\[\]0-9]+$/.test(path);
}

const MAX_DEPTH = 50;

/**
 * Options for safe get/set operations.
 */
interface SafeOptions {
	/** If true, throws on invalid/unsafe paths or structure issues. */
	strict?: boolean;
}

export function getChildUiSchema(
	uiSchema: UiSchema,
	propertyName: number | string,
): UiSchema {
	return typeof uiSchema[propertyName] === 'object'
		? uiSchema[propertyName]
		: {};
}

/**
 * Determines the label for a field based on the schema title or the last part of the path.
 * If the schema does not have a title and the last part of the path is not a number,
 * it uses the last part of the path as the label.
 *
 * @param schema - The JSON schema of the field.
 * @param path - The path to the field in the schema.
 * @param uiSchema - UI options for customizing the field's appearance and behavior.
 * @returns - The determined label for the field.
 */
export function getLabelFromSchemaOrPath({
	path,
	schema,
	uiSchema,
}: {
	path: PathArray;
	schema: ReadonlyJSONSchema7;
	uiSchema: UiSchema;
}): string {
	const lastPathPart = path.at(-1);
	let pathLabel = '';

	if (lastPathPart) {
		pathLabel = String(lastPathPart);
	}

	return uiSchema['ui:title'] ?? schema.title ?? pathLabel;
}

/**
 * Safely retrieves a deeply nested value from an object.
 *
 * @param object - The source object to query.
 * @param path - A string path, e.g. `'user.profile.name'`.
 * @param options - Optional settings (e.g., strict mode).
 * @returns The value at the specified path, or `undefined` if inaccessible.
 */
// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-parameters
export function getSafe<T = unknown>(
	object: Record<string, unknown>,
	path: (number | string)[] | string,
	{ strict = true }: SafeOptions = {},
): T | undefined {
	const parts = makePartsFromPath(path, strict);
	if (!parts) return undefined;

	if (parts.length > MAX_DEPTH) {
		if (strict)
			throw new Error(`Path exceeds max depth (${MAX_DEPTH.toString()})`);
		return undefined;
	}

	let current: unknown = object;

	for (const key of parts) {
		if (isUnsafeKey(key)) {
			if (strict) throw new Error(`Unsafe key in path: "${key}"`);
			return undefined;
		}

		if (!isUnknownObject(current)) {
			if (strict)
				throw new Error(`Cannot traverse non-object during path resolution`);
			return undefined;
		}

		current = current[key];
	}

	return current as T;
}

/**
 * Converts a dot-path string (used for schema fields) into a safe HTML `id` attribute.
 *
 * - Dots (`.`) are replaced with double underscores (`__`) to preserve nesting structure.
 * - Array indices like `[0]` are converted to `_0` to maintain readability and avoid invalid characters.
 * - The result is optionally prefixed.
 * - Casing is preserved.
 *
 * @param path - A dot-path string, e.g. `"user.name"` or `"items[0].title"`
 * @param prefix - Optional string to prepend to the generated ID (e.g. `"form-"`)
 * @returns A safe, deterministic, and structured HTML ID string
 *
 * @example
 * makeIdFromPath("user.name") // "user__name"
 * makeIdFromPath("items[0].name") // "items_0__name"
 * makeIdFromPath("profile.pictures[2].url", "form-") // "form-profile__pictures_2__url"
 */
export function makeIdFromPath(path: string, prefix = ''): string {
	return (
		prefix +
		path
			.replaceAll(/\[(\d+)\]/g, '_$1') // Convert array indices [0] → _0
			.replaceAll('.', '__') // Convert dots → double underscores
	);
}

/**
 * Safely sets a value at a given path within a deeply nested object.
 *
 * @param object - The target object to mutate.
 * @param path - A string path, e.g. `'user.profile.name'` or `'items[0].id'`.
 * @param value - The value to set at the specified path.
 * @param options - Optional settings (e.g., strict mode).
 * @returns The original object with modifications applied.
 */
// eslint-disable-next-line sonarjs/cognitive-complexity
export function setSafe<Type extends Record<number | string, unknown>>(
	object: Type,
	path: (number | string)[] | string,
	value: unknown,
	{ strict = true }: SafeOptions = {},
): Type {
	const parts = makePartsFromPath(path, strict);
	if (!parts) return object;

	if (parts.length > MAX_DEPTH) {
		if (strict)
			throw new Error(`Path exceeds max depth (${MAX_DEPTH.toString()})`);
		return object;
	}

	let current: unknown = object;

	for (let index = 0; index < parts.length; index++) {
		const key = parts[index];
		if (!key) throw new ReferenceError('No key');

		if (isUnsafeKey(key)) {
			if (strict) throw new Error(`Unsafe key in path: "${key}"`);
			return object;
		}

		const isLast = index === parts.length - 1;
		if (!isUnknownObject(current)) {
			if (strict)
				throw new Error(
					`Cannot traverse non-object at "${parts.slice(0, index).join('.')}"`,
				);
			return object;
		}

		if (isLast) {
			current[key] = value;
		} else {
			const nextPart = parts[index + 1];
			if (!nextPart) throw new ReferenceError('No next part');

			const shouldBeArray = isNumeric(nextPart);

			// Initialize intermediate objects/arrays if missing
			if (
				!(key in current) ||
				!(isUnknownObject(current[key]) || Array.isArray(current[key]))
			) {
				current[key] = shouldBeArray ? [] : {};
			}

			current = current[key];
		}
	}

	return object;
}

function makePartsFromPath(
	path: (number | string)[] | string,
	strict = true,
): string[] | undefined {
	if (typeof path === 'string' && !isValidPath(path)) {
		if (strict) throw new Error(`Invalid path format: ${JSON.stringify(path)}`);
		return undefined;
	}

	return Array.isArray(path)
		? path.map(String)
		: path
				.replaceAll(/\[(\w+)\]/g, '.$1') // convert bracket to dot notation
				.split('.')
				.filter(Boolean);
}
