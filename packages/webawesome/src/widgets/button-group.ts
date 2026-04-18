import type { Widgets } from '@jsfe/engine';

import { html } from '@lit-labs/signals';
import { ifDefined } from 'lit/directives/if-defined.js';

export const buttonGroup: Widgets['ButtonGroup'] = (options) => html`
	<wa-radio-group
		size="medium"
		label=${ifDefined(options.label)}
		help-text=${ifDefined(options.helpText)}
		value=${options.value === undefined ? '' : String(options.value)}
		name=${options.html.id}
		?required=${options.html.required ?? false}
	>
		${options.enum?.map(
			(enumValue) =>
				html`<wa-radio
					appearance="button"
					?disabled=${
						/* NOTE: This is a trick because otherwise we won't see pre-prepopulated value  */
						String(enumValue) === options.value ? false : options.html.disabled
					}
					value=${String(enumValue)}
					>${enumValue}</wa-radio
				>`,
		)}
	</wa-radio-group>
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
