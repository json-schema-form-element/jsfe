import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';

import type { Widgets } from '@jsfe/types';

import '@spectrum-web-components/field-label/sp-field-label.js';
import '@spectrum-web-components/help-text/sp-help-text.js';
import type { NumberField } from '@spectrum-web-components/number-field';
import '@spectrum-web-components/number-field/sp-number-field.js';

export const number: Widgets['number'] = (options) =>
	html` <!--  -->
		<sp-number-field
			value=${ifDefined(options.value)}
			step=${ifDefined(options.step)}
			min=${ifDefined(options.min)}
			max=${ifDefined(options.max)}
			.label=${options.label}
			.helpText=${options.helpText}
			placeholder=${options.placeholder}
			.name=${options.id}
			.id=${options.id}
			.required=${options.required}
			@input=${(event: Event) => {
				const newValue = (event.target as NumberField).valueAsNumber;
				console.log(newValue);
				options.valueChangedCallback?.(newValue);
			}}
		></sp-number-field>`;
