import type {
	CommonWidgetOptions,
	// Core types that should be exported
	JSONSchema7,
	ReadonlyJSONSchema7,
	UiSchema,
	Widgets,
} from '@jsfe/engine';

import * as engineModule from '@jsfe/engine';
import { JsonSchemaFormEngine } from '@jsfe/engine';
import assert from 'node:assert';
import test, { describe } from 'node:test';

/**
 * Type tests - these will fail at compile time if types aren't exported correctly.
 * Note: There are many more types in the codebase (in types/form.ts, types/widgets.ts, etc.)
 * that are not currently re-exported through types/index.ts. If these types are needed by consumers,
 * they should be added to the exports in types/index.ts.
 */
interface TypeTests {
	commonWidgetOpts: CommonWidgetOptions;
	readonlySchema: ReadonlyJSONSchema7;
	// Core types
	schema: JSONSchema7;
	uiSchema: UiSchema;
	widgets: Widgets;
}

// Ensure the interface is used (prevents unused interface warning)
const _typeCheck = (test: TypeTests) => test;
_typeCheck({} as TypeTests);

void describe('Library exports', () => {
	void test('Should export JsonSchemaFormEngine', () => {
		assert.strictEqual(
			typeof JsonSchemaFormEngine,
			'function',
			'JsonSchemaFormEngine should be a function',
		);
	});

	void test('Should have all expected exports', () => {
		const expectedExports = ['JsonSchemaFormEngine'];
		const actualExports = Object.keys(engineModule);

		// Check if all expected exports exist
		for (const exportName of expectedExports)
			assert.ok(
				actualExports.includes(exportName),
				`Expected export "${exportName}" to exist`,
			);

		// Check if there aren't any unexpected exports
		assert.strictEqual(
			actualExports.length,
			expectedExports.length,
			'Should not have unexpected exports',
		);
	});
});
