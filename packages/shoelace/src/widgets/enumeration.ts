import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';

import type { Widgets } from '@jsfe/types';

import '@shoelace-style/shoelace/dist/components/input/input.js';
import type { SlSelect } from '@shoelace-style/shoelace';

export const enumeration: Widgets['enumeration'] = (options) => html`
	<sl-select
		value=${ifDefined(options.value)}
		.label=${options.label}
		.helpText=${options.helpText}
		.required=${options.required}
		@sl-change=${(event: Event) => {
			let newValue: string | null | number | string[] = (
				event.target as SlSelect
			).value;
			if (Array.isArray(newValue)) return;

			if (options.type === 'number' || options.type === 'integer') {
				newValue = Number(newValue);
			}
			// if (options.type?.includes('null') && !newValue) {
			// 	newValue = null;
			// }

			options.valueChangedCallback?.(newValue);

			// handleChange(path, newValue, [
			// 	...schemaPath,
			// 	'enum',
			// 	schema.enum?.indexOf(newValue),
			// ]);
		}}
		>${options.enum?.map(
			(enumValue) =>
				html` <sl-option .value=${String(enumValue)}>
					${enumValue}
				</sl-option>`,
		)}</sl-select
	>
`;
