import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';

import type { Widgets } from '@j_c/jsfe__types';

import '@shoelace-style/shoelace/dist/components/range/range.js';
import type { SlRange } from '@shoelace-style/shoelace';

export const range: Widgets['number'] = (options) =>
	html` <!--  -->
		<sl-range
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
			@sl-input=${(event: Event) => {
				const newValue = (event.target as SlRange).value;
				console.log(newValue);
				options.valueChangedCallback?.(newValue);
			}}
		></sl-range>`;
