import { html } from 'lit';
// import { ifDefined } from 'lit/directives/if-defined.js';

import type { Widgets } from '@jsfe/types';

import '@shoelace-style/shoelace/dist/components/input/input.js';
import type { SlInput } from '@shoelace-style/shoelace';

export const date: Widgets['date'] = (options) => html`
	<sl-input
		type=${options.type}
		.label=${options.label ?? ''}
		.helpText=${options.helpText ?? ''}
		value=${options.value ? options.value : ''}
		.name=${options.id}
		.id=${options.id}
		.required=${options.required ?? false}
		@sl-input=${(event: CustomEvent) => {
			let { value } = event.target as SlInput;

			if (options.type === 'datetime-local') {
				value = new Date(value);
			}

			options.valueChangedCallback?.(
				// NOTE: Date time does not return `valueAsDate`
				// TODO: valueChangedCallback should coerce to Date later (when possible)
				value,
			);
		}}
	>
	</sl-input>
`;
