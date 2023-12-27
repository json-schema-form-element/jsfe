import { html } from 'lit';

// import { ifDefined } from 'lit/directives/if-defined.js';
import type { Widgets } from '@jsfe/types';

import type { SlRadioGroup } from '@shoelace-style/shoelace';
import '@shoelace-style/shoelace/dist/components/radio-button/radio-button.js';
import '@shoelace-style/shoelace/dist/components/radio-group/radio-group.js';

export const buttonGroup: Widgets['buttonGroup'] = (options) => html`
	<sl-radio-group
		size="medium"
		.label=${options.label ?? ''}
		.helpText=${options.helpText ?? ''}
		value=${typeof options.value !== 'undefined' ? String(options.value) : ''}
		.name=${options.id}
		.required=${options.required ?? false}
		@sl-change=${(event: Event) => {
			let newValue: (typeof options)['enum'][number] = (
				event.target as SlRadioGroup
			).value;

			if (options.type === 'number') {
				newValue = Number(newValue);
			}

			options.valueChangedCallback?.(newValue);
		}}
	>
		${options.enum?.map(
			(enumVal) =>
				html`<sl-radio-button
					.disabled=${
						/* NOTE: This is a trick because otherwise we won't see pre-prepopulated value  */
						String(enumVal) === options.value ? false : options.disabled
					}
					value=${String(enumVal)}
					>${enumVal}</sl-radio-button
				>`,
		)}
	</sl-radio-group>
`;
