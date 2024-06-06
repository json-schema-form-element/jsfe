import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';

import type { Widgets } from '@jsfe/types';

import '@spectrum-web-components/slider/sp-slider.js';
import type { Slider } from '@spectrum-web-components/slider';

export const range: Widgets['number'] = (options) =>
	html` <!--  -->
		<sp-slider
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
				const newValue = (event.target as Slider).value;
				console.log(newValue);
				options.valueChangedCallback?.(newValue);
			}}
		></sp-slider>`;
