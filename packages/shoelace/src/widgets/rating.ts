import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';

import type { Widgets } from '@jsfe/types';

import '@shoelace-style/shoelace/dist/components/rating/rating.js';
import type { SlRating } from '@shoelace-style/shoelace';

export const rating: Widgets['number'] = (options) =>
	html`<!--  -->
		<div class="theme-shoelace widget-rating" part="widget-rating">
			<label for=${options.id}>${options.label}</label>

			<sl-rating
				value=${ifDefined(options.value)}
				precision=${
					/* NOTE: buggy typing here. Using "any" with step is fine */
					ifDefined(options.step)
				}
				min=${ifDefined(options.min)}
				max=${ifDefined(options.max)}
				.helpText=${options.helpText}
				.name=${options.id}
				.id=${options.id}
				.required=${options.required}
				@sl-change=${(event: Event) => {
					const newValue = (event.target as SlRating).value;
					console.log(newValue);
					options.valueChangedCallback?.(newValue);
				}}
			></sl-rating>
		</div>`;
