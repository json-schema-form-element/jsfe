import { html } from 'lit';
// import { ifDefined } from 'lit/directives/if-defined.js';

import type { Widgets } from '@j_c/jsfe__types';

import '@shoelace-style/shoelace/dist/components/input/input.js';
import type { SlInput } from '@shoelace-style/shoelace';

export const date: Widgets['date'] = (options) => html`
	<sl-input
		type=${options.type}
		.label=${options.label ?? ''}
		.helpText=${options.helpText ?? ''}
		value=${options.value ? String(options.value) : ''}
		.name=${options.id}
		.id=${options.id}
		.required=${options.required ?? false}
		@sl-input=${(event: CustomEvent) => {
			const { valueAsDate: newValue } = event.target as SlInput;
			options.valueChangedCallback?.(newValue ?? undefined);
		}}
	>
	</sl-input>
`;
