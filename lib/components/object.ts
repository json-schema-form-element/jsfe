import type { JSONSchema7 } from 'json-schema';
import { flag } from './callout.js';
import { nothing, html } from 'lit';
import type { Jsf, Path, UiSchema } from '../json-schema-form.js';

export const objectField = (
	schema: JSONSchema7,
	data: any,
	path: Path,
	uiState: any,
	uiSchema: UiSchema,
	dig: Jsf['_dig'],
) => {
	if (typeof schema.properties !== 'object') return flag('Wrong object field');

	return html` <!-- -->
		<fieldset part="object">
			<!-- -->
			${schema.title ? html`<legend>${schema.title}</legend>` : ``}
			${schema.description ? html`<p>${schema.description}</p>` : nothing}
			${Object.entries(schema.properties).map(([propName, propValue]) => {
				if (Array.isArray(propValue) || typeof propValue === 'boolean') return;

				const value = data?.[propName] as unknown;
				const subPath = [...path, propName];

				const required = schema.required?.includes(propName);

				return dig(
					propValue,
					value,
					subPath,
					uiState?.[propName],
					uiSchema?.[propName],
					required,
				);
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
								  )
								: ''}
					  </div>`
					: nothing
			}
		</fieldset>`;
};
