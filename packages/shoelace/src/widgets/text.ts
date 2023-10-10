import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';

import type { Widgets } from '@jsfe/types';

import '@shoelace-style/shoelace/dist/components/input/input.js';
import type { SlInput } from '@shoelace-style/shoelace';

export const text: Widgets['text'] = (options) => html`
	<!-- ${options.pattern} -->
	<sl-input
		type="text"
		.label=${options.label}
		.helpText=${options.helpText}
		placeholder=${options.placeholder}
		value=${ifDefined(options.value)}
		.name=${options.id}
		.id=${options.id}
		.required=${options.required}
		minLength=${ifDefined(options.minLength)}
		maxLength=${ifDefined(options.maxLength)}
		pattern=${ifDefined(options.pattern)}
		@sl-input=${(event: CustomEvent) => {
			const { value: newValue } = event.target as SlInput;
			options.valueChangedCallback?.(newValue);
		}}
	>
	</sl-input>
`;
