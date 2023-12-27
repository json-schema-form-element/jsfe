import 'wired-elements/lib/wired-slider.js';
import type { WiredSlider } from 'wired-elements/lib/wired-slider.js';

import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';

import type { Widgets } from '@jsfe/types';

export const range: Widgets['number'] = (options) => html`
	<!--  -->
	<label for=${options.id}>${options.label}</label>
	<div>${options.helpText}</div>
	<wired-slider
		value=${ifDefined(options.value)}
		step=${ifDefined(options.step)}
		min=${ifDefined(options.min)}
		max=${ifDefined(options.max)}
		.name=${options.id}
		.id=${options.id}
		.required=${options.required}
		@change=${(event: Event) => {
			const newValue = (event.target as WiredSlider).value;
			console.log(newValue);
			options.valueChangedCallback?.(newValue);
			console.log(newValue);
		}}
	></wired-slider>

	${options.value ?? '-'}
`;
