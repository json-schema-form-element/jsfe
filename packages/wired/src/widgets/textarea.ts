import 'wired-elements/lib/wired-textarea.js';
import type { WiredTextarea } from 'wired-elements/lib/wired-textarea.js';

import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';

import type { Widgets } from '@jsfe/types';

import { field } from './_field.js';

export const textarea: Widgets['text'] = (options) => html`
	${field(
		options,
		html`<wired-textarea
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
				const { value: newValue } = event.target as WiredTextarea;
				options.valueChangedCallback?.(newValue);
			}}
			@keydown=${options.handleKeydown}
		>
		</wired-textarea>`,
		typeof options.maxLength !== 'undefined'
			? html`${options.value?.length} / ${options.maxLength}`
			: undefined,
	)}
`;
