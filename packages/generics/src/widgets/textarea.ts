import type { Widgets } from '@jsfe/engine';

import { html } from '@lit-labs/signals';
import { ifDefined } from 'lit/directives/if-defined.js';

import { Field } from './_field.js';

export const Textarea: Widgets['Textarea'] = (options) => html`
	${Field(
		options,
		html`<textarea
			class=${ifDefined(options.classes.input)}
			id=${options.html.id}
			.innerText=${options.html.value ?? ''}
			maxlength=${ifDefined(options.html.maxLength)}
			minlength=${ifDefined(options.html.minLength)}
			name=${options.html.name}
			placeholder=${ifDefined(options.html.placeholder)}
			part=${`Textarea-input`}
			?required=${options.html.required}
		></textarea>`,
		options.html.maxLength === undefined
			? undefined
			: html`<small
					class=${ifDefined(options.classes.constraints)}
					part=${`Textarea-constraints`}
					>${options.html.value?.length} / ${options.html.maxLength}</small
				>`,
		// TODO: UI options
		// autosize
	)}
`;
