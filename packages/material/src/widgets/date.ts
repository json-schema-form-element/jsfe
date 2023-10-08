import { html } from 'lit';

import type { Widgets } from '@j_c/jsfe__types';

import '@material/web/textfield/outlined-text-field.js';
import type { MdOutlinedTextField } from '@material/web/textfield/outlined-text-field.js';

export const date: Widgets['date'] = (options) => html`
	<md-outlined-text-field
		.type=${options.type}
		.supportingText=${options.helpText ?? ''}
		.id=${options.id}
		.label=${options.label ?? ''}
		.name=${options.id}
		.placeholder=${options.placeholder ?? ''}
		.required=${options.required ?? false}
		.value=${options.value ? String(options.value) : ''}
		@input=${(event: CustomEvent) => {
			const { valueAsDate: newValue } = event.target as MdOutlinedTextField;

			if (newValue) options.valueChangedCallback?.(newValue);
		}}
		@keydown=${options.handleKeydown}
	>
	</md-outlined-text-field>
	<style>
		md-outlined-text-field {
			width: 100%;
		}
	</style>
`;
