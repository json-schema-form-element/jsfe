import { html } from 'lit';
// import { ifDefined } from 'lit/directives/if-defined.js';

import type { Widgets } from '@j_c/jsfe__types';

import '@shoelace-style/shoelace/dist/components/radio-group/radio-group.js';
import '@shoelace-style/shoelace/dist/components/radio-button/radio-button.js';
import type { SlRadioGroup } from '@shoelace-style/shoelace';

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
				html`<sl-radio-button value=${String(enumVal)}
					>${enumVal}</sl-radio-button
				>`,
		)}
	</sl-radio-group>
`;
