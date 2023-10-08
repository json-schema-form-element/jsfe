import { html } from 'lit';

import type { Widgets } from '@j_c/jsfe__types';

import { field } from './_field.js';

export const colorPicker: Widgets['colorPicker'] = (options) => html`
	${field(
		options,
		html`<input
			type="color"
			placeholder=${options.placeholder ?? ''}
			.value=${options.value ?? ''}
			.name=${options.id}
			.id=${options.id}
			.required=${options.required ?? true}
			@input=${(event: Event) => {
				const newValue = (event.target as HTMLInputElement).value;
				options.valueChangedCallback?.(newValue);
			}}
			@keydown=${options.handleKeydown}
		/>`,
	)}
`;
