import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';

import type { Widgets } from '@j_c/jsfe__types';

import '@carbon/web-components/es/components/textarea/index.js';
import type CDSTextArea from '@carbon/web-components/es/components/textarea/textarea.js';

export const textarea: Widgets['text'] = (options) => html`
	<cds-textarea
		class="theme-carbon widget-textarea"
		.type=${'text'}
		.helperText=${options.helpText ?? ''}
		.id=${options.id}
		.label=${options.label ?? ''}
		maxLength=${ifDefined(options.maxLength)}
		minLength=${ifDefined(options.minLength)}
		.name=${options.id}
		pattern=${ifDefined(options.pattern)}
		.placeholder=${options.placeholder ?? ''}
		.required=${options.required ?? false}
		.value=${options.value ?? ''}
		@input=${(event: CustomEvent) => {
			const { value: newValue } = event.target as CDSTextArea;
			options.valueChangedCallback?.(newValue);
		}}
		@keydown=${options.handleKeydown}
	>
	</cds-textarea>
`;
