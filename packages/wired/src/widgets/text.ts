import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';

import type { Widgets } from '@j_c/jsfe__types';

import { field } from './_field.js';

import 'wired-elements/lib/wired-input.js';
import type { WiredInput } from 'wired-elements/lib/wired-input.js';

export const text: Widgets['text'] = (options) => html`
	${field(
		options,
		html`<wired-input
			.type=${'text' /* keep-sorted start */}
			.id=${options.id}
			.label=${options.label}
			maxLength=${ifDefined(options.maxLength)}
			minLength=${ifDefined(options.minLength)}
			.name=${options.id}
			pattern=${ifDefined(options.pattern)}
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
		typeof options.maxLength !== 'undefined'
			? html`${options.value?.length} / ${options.maxLength}`
			: undefined,
	)}
`;
