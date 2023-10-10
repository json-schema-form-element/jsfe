import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';

import type { Widgets } from '@jsfe/types';

import { field } from './_field.js';

export const number: Widgets['number'] = (options) => html`
	${field(
		options,
		html`<input
			type="number"
			value=${ifDefined(options.value)}
			step=${ifDefined(options.step)}
			min=${ifDefined(options.min)}
			max=${ifDefined(options.max)}
			@input=${(event: Event) => {
				const newValue = (event.target as HTMLInputElement).valueAsNumber;
				console.log(newValue);
				options.valueChangedCallback?.(newValue);
			}}
		/>`,
	)}
`;
