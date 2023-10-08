import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';

import type { Widgets } from '@j_c/jsfe__types';
import { field } from './_field.js';

export const range: Widgets['range'] = (options) => html`
	${options.step}
	${field(
		options,
		html`<input
			type="range"
			value=${options.value ?? '0'}
			step=${options.step}
			min=${ifDefined(options.min)}
			max=${ifDefined(options.max)}
			@input=${(event: Event) => {
				const newValue = (event.target as HTMLInputElement).valueAsNumber;
				console.log(newValue);
				options.valueChangedCallback?.(newValue);
			}}
		/>`,
		html`${options.value ?? '-'}`,
	)}
`;
