import type { Widgets } from '@jsfe/engine';

import { html } from '@lit-labs/signals';
import { ifDefined } from 'lit/directives/if-defined.js';

export const Select: Widgets['Select'] = (options) => html`
	<sl-select
		value=${ifDefined(options.value)}
		?required=${options.html.required}
		?disabled=${options.html.disabled}
		label=${ifDefined(options.label)}
		help--text=${ifDefined(options.helpText)}
		>${options.enum?.map(
			(enumValue) =>
				html` <sl-option .value=${String(enumValue)}>
					${enumValue}
				</sl-option>`,
		)}</sl-select
	>
`;
// @sl-change=${(event: Event) => {
//   let newValue: null | number | string | string[] = (
//     event.target as SlSelect
//   ).value;
//   if (Array.isArray(newValue)) return;
//   if (options.type === 'number' || options.type === 'integer') {
//     newValue = Number(newValue);
//   }
//   options.valueChangedCallback?.(newValue);
// }}
