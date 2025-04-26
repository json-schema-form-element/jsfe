import type { Widgets } from '@jsfe/engine';

import { html } from '@lit-labs/signals';
import { ifDefined } from 'lit/directives/if-defined.js';

import { Field } from './_field.js';

export const Select: Widgets['Select'] = (options) => html`
	${Field(
		options,
		html`<select
			name=${options.html.name}
			id=${options.html.id}
			value=${ifDefined(options.html.value)}
			?required=${options.html.required}
			label=${ifDefined(options.label)}
			aria-describedby=${`${options.html.id}__description`}
		>
			${options.enum?.map(
				(enumValue) =>
					html`<option .value=${String(enumValue)}>${enumValue}</option>`,
			)}
		</select>`,
	)}
`;
//

// @input=${(event: Event) => {
//   let newValue: string | null | number | string[] = (
//     event.target as HTMLSelectElement
//   ).value;
//   if (Array.isArray(newValue)) return;
//   if (options.type === 'number' || options.type === 'integer') {
//     newValue = Number(newValue);
//   }
//   options.valueChangedCallback?.(newValue);
// }}
