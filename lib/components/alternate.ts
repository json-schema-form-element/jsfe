import type { JSONSchema7 } from 'json-schema';
import type { Jsf, Path, UiSchema } from '../json-schema-form.js';
import { html } from 'lit';
import { flag } from './callout.js';

import '@shoelace-style/shoelace/dist/components/select/select.js';
import '@shoelace-style/shoelace/dist/components/option/option.js';

// NOTE: Experimental!
export const alternateField = (
	schema: JSONSchema7,
	data: unknown,
	path: Path,
	uiState: unknown,
	uiSchema: UiSchema,
	handleChange: Jsf['_handleChange'],
	dig: Jsf['_dig'],
	updateUi: Jsf['_updateUi'],
) => {
	if (typeof schema.oneOf !== 'object' && typeof schema.anyOf !== 'object')
		return flag('Wrong alternate field');

	return html` <!-- -->
		<fieldset part="alternate">
			<!-- -->
			${JSON.stringify(path)} ${JSON.stringify(uiState?.alternative)}
			<sl-select
				value=${0}
				@sl-change=${(e: Event) => {
					handleChange([...path], {}, schemaPath);
					updateUi(
						[...path, 'alternative'],
						Number((e.target as HTMLSelectElement)?.value),
					);
				}}
			>
				${(schema.oneOf || schema.anyOf || []).map((prop, index) => {
					if (typeof prop === 'boolean') return flag('Missing object input');

					return html`
						<sl-option value=${index}
							>${prop.title ?? `Option ${index + 1}`}</sl-option
						>
					`;
				})}
			</sl-select>
			<div>
				${(schema.oneOf || schema.anyOf)?.map((prop, index) => {
					if (typeof prop === 'boolean') return flag('Missing object input');
					return html` <div
						.hidden=${uiState.alternative
							? uiState.alternative !== index
							: index !== 0}
					>
						${dig(prop, data[index], [...path], uiState, uiSchema)}
					</div>`;
				})}
			</div>
		</fieldset>`;
};
