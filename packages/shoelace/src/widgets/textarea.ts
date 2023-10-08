import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';

import type { Widgets } from '@j_c/jsfe__types';

import '@shoelace-style/shoelace/dist/components/textarea/textarea.js';
import type { SlTextarea } from '@shoelace-style/shoelace';

export const textarea: Widgets['textarea'] = (options) => html`
	<!--  -->
	<sl-textarea
		.label=${options.label ?? ''}
		.helpText=${options.helpText ?? ''}
		placeholder=${options.placeholder ?? ''}
		value=${ifDefined(options.value)}
		.name=${options.id}
		.id=${options.id}
		.required=${options.required ?? true}
		minLength=${ifDefined(options.minLength)}
		maxLength=${ifDefined(options.maxLength)}
		@sl-input=${(event: Event) => {
			const { value: newValue } = event.target as SlTextarea;
			options.valueChangedCallback?.(newValue);
		}}
	>
	</sl-textarea>
`;
