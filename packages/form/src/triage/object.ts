import { html } from 'lit';
import type { JSONSchema7 } from '@jsfe/types';
import type { Widgets, Jsf, Path, UiSchema } from '../index.js';

export const objectField = (
	schema: JSONSchema7,
	data: unknown,
	path: Path,
	uiState: unknown,
	uiSchema: UiSchema,
	dig: Jsf['_dig'],
	schemaPath: Path,
	widgets: Widgets,
) => {
	const error = 'Wrong object field';
	if (typeof schema.properties !== 'object')
		return widgets.callout?.({ id: '', message: error }) ?? html`${error}`;

	const children = Object.entries(schema.properties).map(
		([propName, propValue]) => {
			if (Array.isArray(propValue) || typeof propValue === 'boolean')
				return html``;

			const value = data?.[propName] as unknown;
			const subPath = [...path, propName];

			const required = schema.required?.includes(propName);

			const schemaPathAugmented = [...schemaPath];
			// const propName = path.at(-1);
			// schemaPathAugmented.push(propName);
			// if (!Number.isNaN(propName)) {
			// 	schemaPathAugmented.push(Number(propName));
			// } else {
			// }
			schemaPathAugmented.push(propName);

			// ${debuggerInline({ schemaPath, path })}
			return dig(
				propValue,
				value,
				subPath,
				uiState?.[propName],
				uiSchema?.[propName],
				schemaPathAugmented,
				required,
			);
		},
	);

	const options = {
		id: path.join('.'),
		label: schema.title ?? path.at(-1),
		helpText: schema.description,
		children,
	};

	return (
		widgets?.object?.(options) ??
		widgets?.callout?.({ id: '', message: error }) ??
		html`${error}`
	);
};

// ${
// 	/* NOTE: Experimental */ schema?.additionalProperties
// 		? html`<div>
// 				${schema?.additionalProperties
// 					? dig(
// 							{
// 								type: 'array',
// 								items: {
// 									type: 'string',
// 								},
// 							},
// 							data,
// 							[...path],
// 							uiState,
// 							uiSchema,
// 							schemaPath,
// 						)
// 					: nothing}
// 			</div>`
// 		: nothing
// }
