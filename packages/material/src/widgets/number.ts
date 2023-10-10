import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';

import type { Widgets } from '@jsfe/types';

import '@material/web/textfield/outlined-text-field.js';
import type { MdOutlinedTextField } from '@material/web/textfield/outlined-text-field.js';

export const number: Widgets['number'] = (options) => html`
	<md-outlined-text-field
		.type=${'number'}
		.supportingText=${options.helpText}
		.id=${options.id}
		.label=${options.label}
		step=${ifDefined(options.step)}
		min=${ifDefined(options.min)}
		max=${ifDefined(options.max)}
		.name=${options.id}
		.placeholder=${options.placeholder}
		.required=${options.required}
		value=${ifDefined(options.value)}
		@input=${(event: CustomEvent) => {
			const { valueAsNumber: newValue } = event.target as MdOutlinedTextField;
			options.valueChangedCallback?.(newValue);
		}}
		@keydown=${options.handleKeydown}
	>
	</md-outlined-text-field>
`;
