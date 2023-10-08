import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';

import type { Widgets } from '@j_c/jsfe__types';

import '@carbon/web-components/es/components/text-input/index.js';
import type CDSTextInput from '@carbon/web-components/es/components/text-input/text-input.js';

export const text: Widgets['text'] = (options) => html`
	<cds-text-input
		class="theme-carbon widget-text"
		.type=${'text' /* keep-sorted start */}
		.helperText=${options.helpText ?? ''}
		.id=${options.id}
		.label=${options.label ?? ''}
		maxCount=${ifDefined(options.maxLength)}
		minCount=${ifDefined(options.minLength)}
		.name=${options.id}
		.enableCounter=${true}
		pattern=${ifDefined(options.pattern)}
		.placeholder=${options.placeholder ?? ''}
		.required=${options.required ?? false}
		.value=${options.value ?? '' /* keep-sorted end */}
		@input=${(event: CustomEvent) => {
			const { value: newValue } = event.target as CDSTextInput;
			options.valueChangedCallback?.(newValue);
		}}
		@keydown=${options.handleKeydown}
	>
	</cds-text-input>
`;
