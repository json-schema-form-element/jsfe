import type { JSONSchema7 } from 'json-schema';
import { flag } from './callout.js';
import { nothing, html } from 'lit';
import type { Jsf, Path, UiSchema } from '../json-schema-form.js';
import { debuggerInline } from './utils.js';

export const objectField = (
	schema: JSONSchema7,
	data: unknown,
	path: Path,
	uiState: unknown,
	uiSchema: UiSchema,
	dig: Jsf['_dig'],
	schemaPath: Path,
) => {
	if (typeof schema.properties !== 'object') return flag('Wrong object field');

	return html` <!-- -->
		<fieldset part="object">
			${debuggerInline({ schemaPath, path })}
			<!-- -->
			${schema.title ? html`<legend>${schema.title}</legend>` : ``}
			${schema.description ? html`<p>${schema.description}</p>` : nothing}
			<!--  -->
			${Object.entries(schema.properties).map(([propName, propValue]) => {
				if (Array.isArray(propValue) || typeof propValue === 'boolean')
					return '';

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

				return html` ${debuggerInline({ schemaPath, path })}
				${dig(
					propValue,
					value,
					subPath,
					uiState?.[propName],
					uiSchema?.[propName],
					schemaPathAugmented,
					required,
				)}`;
			})}
			${
				/* NOTE: Experimental */ schema?.additionalProperties
					? html`<div>
							${schema?.additionalProperties
								? dig(
										{
											type: 'array',
											items: {
												type: 'string',
											},
										},
										data,
										[...path],
										uiState,
										uiSchema,
										schemaPath,
								  )
								: ''}
					  </div>`
					: nothing
			}
		</fieldset>`;
};
