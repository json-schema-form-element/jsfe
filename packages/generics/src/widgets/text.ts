import type { Widgets } from '@jsfe/engine';

import { html } from '@lit-labs/signals';
import { ifDefined } from 'lit/directives/if-defined.js';

import { Field } from './_field.js';

export const Text: Widgets['Text'] = (options) => html`
	${Field(
		options,
		html`<input
			aria-describedby=${`${options.html.id}__description`}
			aria-label=${ifDefined(options.labelHidden ? options.label : undefined)}
			class=${ifDefined(options.classes.input)}
			id=${options.html.id}
			maxlength=${ifDefined(options.html.maxLength)}
			minlength=${ifDefined(options.html.minLength)}
			name=${options.html.name}
			pattern=${ifDefined(options.html.pattern)}
			placeholder=${ifDefined(options.html.placeholder)}
			?readonly=${options.html.readonly}
			?required=${options.html.required}
			type=${options.html.type}
			value=${options.html.value ?? ''}
			part=${`Text-input`}
		/>`,
		options.html.maxLength === undefined
			? undefined
			: html`<small
					class=${ifDefined(options.classes.constraints)}
					part="Text-constraints"
					>${options.html.value?.length} / ${options.html.maxLength}</small
				>`,
	)}
`;
