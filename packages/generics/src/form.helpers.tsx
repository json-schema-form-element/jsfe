'use html-signal';

import type { HTMLTemplateResult } from 'lit';

import {
	type GenericData,
	type GenericFormProperties,
	JsonSchemaFormEngine,
	type ReadonlyJSONSchema7,
	type UiSchema,
} from '@jsfe/engine';
import { type CommonWidgetOptions, type Widgets } from '@jsfe/engine';
import { isDev, Logger } from '@jsfe/engine/logger';

export const log = new Logger();

/**
 * Renders a debug view of the form state
 *
 * @param form - The form engine instance to debug
 * @returns HTML template for the debug view
 */
export function Debugger({
	form,
	tagName,
}: Readonly<{
	data: unknown;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	form: JsonSchemaFormEngine<any, any, any>;
	tagName?: string;
}>): HTMLTemplateResult {
	return (
		<>
			<div>
				{isDev ? 'Development mode' : null}
				{tagName ? <code>{tagName}</code> : null}
			</div>
			{/* <pre>{JSON.stringify(form.$data.get(), null, 2)}</pre> */}
			Data:
			<pre>{JSON.stringify(/* data ?? */ form.$data.get(), null, 2)}</pre>
			<details>
				<pre>{JSON.stringify(form.schema, null, 2)}</pre>
				{/* <pre>{JSON.stringify(form.rootField, null, 2)}</pre> */}
			</details>
		</>
	);
}

/**
 * Renders the widget tree based on the root field and available widgets.
 * Render engine agnostic (pure functions).
 * @param rootField - The root field node
 * @param widgets - Available widget implementations
 * @returns HTML template for the widget tree or error message
 */
export function WidgetTree({
	rootField,
	widgets,
}: {
	rootField: CommonWidgetOptions;
	widgets: Partial<Widgets>;
}): HTMLTemplateResult | string {
	const widgetType = rootField.widget;

	if (widgetType && widgetType in widgets) {
		// @ts-expect-error Should be good.
		const fieldContent = widgets[widgetType](rootField);

		// FIXME
		return fieldContent as HTMLTemplateResult;
	}

	return `Missing widget of type ${widgetType?.toString() ?? 'unknown'}`;
}

const formsBySchema = new WeakMap<
	ReadonlyJSONSchema7,
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	JsonSchemaFormEngine<any, any, any>
>();
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const formsByName = new Map<string, JsonSchemaFormEngine<any, any, any>>();

export function getUniqueForm<
	Schema extends ReadonlyJSONSchema7 | undefined = undefined,
	Ui extends UiSchema = UiSchema,
	Data extends GenericData = GenericData,
>(options: GenericFormProperties<Schema, Ui, Data>) {
	const { data, name, schema, ui, widgets } = options;
	let { form: existing } = options;
	// NOTE: Provided in user options for a <Form> component
	if (existing) return existing;

	// NOTE: Use unique <form> name attribute as the first priority.
	if (name) {
		existing =
			formsByName.get(name) ??
			new JsonSchemaFormEngine(schema, ui, data, widgets);
		formsByName.set(name, existing);

		return existing;
	}
	// NOTE: Then, rely on unique schema reference.
	if (schema) {
		existing =
			formsBySchema.get(schema) ??
			formsBySchema
				.set(schema, new JsonSchemaFormEngine(schema, ui, data, widgets))
				.get(schema);
	}

	if (!existing)
		throw new ReferenceError('You need either a form engine or a schema');

	return existing;
}
