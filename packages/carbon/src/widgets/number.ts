import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';

import type { Widgets } from '@j_c/jsfe__types';

import '@carbon/web-components/es/components/number-input/index.js';
import type CDSTextInput from '@carbon/web-components/es/components/number-input/number-input.js';

export const number: Widgets['number'] = (options) => html`
	<cds-number-input
		.supportingText=${options.helpText}
		.id=${options.id}
		.label=${options.label}
		step=${typeof options.step === 'number' ? options.step : 0.1}
		min=${ifDefined(options.min)}
		max=${ifDefined(options.max)}
		.name=${options.id}
		.placeholder=${options.placeholder}
		.required=${options.required}
		value=${ifDefined(options.value) /* keep-sorted end */}
		@input=${(event: CustomEvent) => {
			const { valueAsNumber: newValue } = event.target as CDSTextInput;
			options.valueChangedCallback?.(newValue);
		}}
		@keydown=${options.handleKeydown}
	>
		<style>
			md-outlined-text-field {
				width: 100%;
			}
		</style>
	</cds-number-input>
`;
