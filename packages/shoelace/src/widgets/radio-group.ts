import { html } from 'lit';

// import { ifDefined } from 'lit/directives/if-defined.js';
import type { Widgets } from '@jsfe/types';

import type { SlRadioGroup } from '@shoelace-style/shoelace';
import '@shoelace-style/shoelace/dist/components/radio-group/radio-group.js';
import '@shoelace-style/shoelace/dist/components/radio/radio.js';

export const radioGroup: Widgets['radioGroup'] = (options) => html`
	<sl-radio-group
		class="theme-shoelace widget-radio-group"
		size="medium"
		.label=${options.label ?? ''}
		.helpText=${options.helpText ?? ''}
		value=${typeof options.value !== 'undefined' ? String(options.value) : ''}
		.name=${options.id}
		.required=${options.required ?? false}
		@sl-change=${(event: CustomEvent) => {
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
				html`<sl-radio .disabled=${options.disabled} value=${String(enumVal)}
					>${enumVal}</sl-radio
				>`,
		)}
	</sl-radio-group>
`;
