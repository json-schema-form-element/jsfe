import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';

import type { Widgets } from '@j_c/jsfe__types';

import { field } from './_field.js';

export const textarea: Widgets['textarea'] = (options) => html`
	${field(
		options,
		html`<textarea
			placeholder=${options.placeholder}
			.name=${options.id}
			.id=${options.id}
			.required=${options.required}
			minlength=${ifDefined(options.minLength)}
			maxlength=${ifDefined(options.maxLength)}
			@input=${(event: Event) => {
				const newValue = (event.target as HTMLInputElement).value;
				options.valueChangedCallback?.(newValue);
			}}
			.innerText=${options.value ?? ''}
		></textarea>`,
		typeof options.maxLength !== 'undefined'
			? html`<small>${options.value?.length} / ${options.maxLength}</small>`
			: undefined,
		// autosize
	)}
`;
