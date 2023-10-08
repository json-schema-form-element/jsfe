import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';

import type { Widgets } from '@j_c/jsfe__types';

import { field } from './_field.js';

export const text: Widgets['text'] = (options) => html`
	${field(
		options,
		html` <input
			type="text"
			placeholder=${options.placeholder}
			.value=${options.value ?? ''}
			.name=${options.id}
			.id=${options.id}
			.required=${options.required}
			minlength=${ifDefined(options.minLength)}
			maxlength=${ifDefined(options.maxLength)}
			pattern=${ifDefined(options.pattern)}
			@input=${(event: Event) => {
				const newValue = (event.target as HTMLInputElement).value;
				options.valueChangedCallback?.(newValue);
			}}
			@keydown=${options.handleKeydown}
		/>`,
		typeof options.maxLength !== 'undefined'
			? html`${options.value?.length} / ${options.maxLength}`
			: undefined,
	)}
`;
