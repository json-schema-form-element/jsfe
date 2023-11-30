import { html, nothing } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';

import type { Widgets } from '@jsfe/types';

import type { Textfield } from '@spectrum-web-components/textfield';

export const textarea: Widgets['text'] = (options) => html`
	${options.label
		? html`<sp-field-label for="name-0-m" for=${options.id}
				>${options.label}</sp-field-label
		  >`
		: nothing}
	<sp-textfield
		.type=${options.inputType}
		.helpText=${options.helpText}
		placeholder=${options.placeholder}
		value=${ifDefined(options.value)}
		.name=${options.id}
		.id=${options.id}
		.required=${options.required}
		minLength=${ifDefined(options.minLength)}
		maxLength=${ifDefined(options.maxLength)}
		multiline
		@input=${(event: CustomEvent) => {
			const { value: newValue } = event.target as Textfield;
			options.valueChangedCallback?.(newValue);
		}}
	>
	</sp-textfield>
	<!-- grows -->
`;
