import type { Widgets } from '@jsfe/engine';

import { html } from '@lit-labs/signals';
import { ifDefined } from 'lit/directives/if-defined.js';

import { Field } from './_field.js';

export const Numberr: Widgets['Number'] = (options) => html`
	${Field(
		options,
		html`<input
			class=${ifDefined(options.classes.input)}
			id=${ifDefined(options.html.id)}
			max=${ifDefined(options.html.max)}
			min=${ifDefined(options.html.min)}
			name=${ifDefined(options.html.name)}
			step=${ifDefined(options.html.step)}
			type=${options.html.type}
			value=${ifDefined(options.html.value)}
			part="Number-input"
		/>`,
	)}
`;
