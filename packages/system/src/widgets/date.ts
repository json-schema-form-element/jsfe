import { html } from 'lit';

import type { Widgets } from '@jsfe/types';

// import { ifDefined } from 'lit/directives/if-defined.js';
import { field } from './_field.js';

export const date: Widgets['date'] = (options) => html`
	${field(
		options,
		html`<input
			type=${options.type}
			value=${options.value ? String(options.value) : ''}
			.name=${options.id}
			.id=${options.id}
			.required=${options.required ?? false}
			@input=${(event: InputEvent) => {
				const { valueAsDate: newValue } = event.target as HTMLInputElement;
				options.valueChangedCallback?.(newValue ?? undefined);
			}}
		/>`,
	)}
`;
