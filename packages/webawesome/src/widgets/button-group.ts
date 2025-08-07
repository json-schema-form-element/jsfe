import type { Widgets } from '@jsfe/engine';

import { html } from '@lit-labs/signals';
import { ifDefined } from 'lit/directives/if-defined.js';

export const buttonGroup: Widgets['ButtonGroup'] = (options) => html`
	<sl-radio-group
		size="medium"
		label=${ifDefined(options.label)}
		help-text=${ifDefined(options.helpText)}
		value=${options.value === undefined ? '' : String(options.value)}
		name=${options.html.id}
		?required=${options.html.required ?? false}
	>
		${options.enum?.map(
			(enumValue) =>
				html`<sl-radio-button
					?disabled=${
						/* NOTE: This is a trick because otherwise we won't see pre-prepopulated value  */
						String(enumValue) === options.value ? false : options.html.disabled
					}
					value=${String(enumValue)}
					>${enumValue}</sl-radio-button
				>`,
		)}
	</sl-radio-group>
`;

// @sl-change=${(event: Event) => {
// 	let newValue: (typeof options)['enum'][number] = (
// 		event.target as SlRadioGroup
// 	).value;

// 	if (options.type === 'number') {
// 		newValue = Number(newValue);
// 	}

// 	options.valueChangedCallback?.(newValue);
// }}
