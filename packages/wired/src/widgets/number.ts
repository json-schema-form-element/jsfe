import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';

import type { Widgets } from '@jsfe/types';

import { field } from './_field.js';

import 'wired-elements/lib/wired-input.js';
import type { WiredInput } from 'wired-elements/lib/wired-input.js';

export const number: Widgets['number'] = (options) => html`
	${field(
		options,
		html`<wired-input
			.type=${'number' /* keep-sorted start */}
			.id=${options.id}
			.label=${options.label}
			min=${ifDefined(options.min)}
			max=${ifDefined(options.max)}
			.name=${options.id}
			.placeholder=${options.placeholder}
			.required=${options.required}
			.value=${options.value ?? '' /* keep-sorted end */}
			@input=${(event: CustomEvent) => {
				const { value: newValue } = event.target as WiredInput;
				options.valueChangedCallback?.(newValue);
			}}
			@keydown=${options.handleKeydown}
		>
		</wired-input>`,
	)}
`;
