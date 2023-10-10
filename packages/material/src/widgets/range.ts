import { html, nothing } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';

import type { Widgets } from '@jsfe/types';

import '@material/web/slider/slider.js';
import type { MdSlider } from '@material/web/slider/slider.js';

export const range: Widgets['range'] = (options) => html`
	<label class="theme-material widget-range">
		<!--  -->
		${options.label} ${options.step}
		<md-slider
			labeled
			.value=${options.value}
			step=${ifDefined(options.step)}
			min=${ifDefined(options.min)}
			max=${ifDefined(options.max)}
			@input=${(event: Event) => {
				const newValue = (event.target as MdSlider).value;
				console.log(newValue);
				options.valueChangedCallback?.(newValue);
			}}
		></md-slider>

		${options.helpText ? html` <div>${options.helpText}</div> ` : nothing}
	</label>
`;
