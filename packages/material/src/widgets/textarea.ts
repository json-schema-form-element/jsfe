import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';

import type { Widgets } from '@j_c/jsfe__types';

import '@material/web/textfield/outlined-text-field.js';
import type { MdOutlinedTextField } from '@material/web/textfield/outlined-text-field.js';

export const textarea: Widgets['textarea'] = (options) => html`
	<md-outlined-text-field
		.type=${'textarea' /* keep-sorted start */}
		.supportingText=${options.helpText}
		.id=${options.id}
		.label=${options.label}
		maxLength=${ifDefined(options.maxLength)}
		minLength=${ifDefined(options.minLength)}
		.name=${options.id}
		pattern=${ifDefined(options.pattern)}
		.placeholder=${options.placeholder}
		.required=${options.required}
		value=${ifDefined(options.value) /* keep-sorted end */}
		@input=${(event: CustomEvent) => {
			const { value: newValue } = event.target as MdOutlinedTextField;
			options.valueChangedCallback?.(newValue);
		}}
		rows=${4}
	>
	</md-outlined-text-field>
`;
