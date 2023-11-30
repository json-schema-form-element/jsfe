import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';

import type { Widgets } from '@jsfe/types';

import '@material/web/textfield/outlined-text-field.js';
import type { MdOutlinedTextField } from '@material/web/textfield/outlined-text-field.js';

export const text: Widgets['text'] = (options) => html`
	<md-outlined-text-field
		.type=${options.inputType}
		.supportingText=${options.helpText}
		.id=${options.id}
		.label=${options.label}
		maxLength=${ifDefined(options.maxLength)}
		minLength=${ifDefined(options.minLength)}
		.name=${options.id}
		pattern=${ifDefined(options.pattern)}
		.placeholder=${options.placeholder}
		.required=${options.required}
		.value=${options.value ?? ''}
		@input=${(event: CustomEvent) => {
			const { value: newValue } = event.target as MdOutlinedTextField;
			options.valueChangedCallback?.(newValue);
		}}
		@keydown=${options.handleKeydown}
	>
	</md-outlined-text-field>
`;
