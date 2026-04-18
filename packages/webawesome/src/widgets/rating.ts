import type { Widgets } from '@jsfe/engine';

import { html } from '@lit-labs/signals';
import { ifDefined } from 'lit/directives/if-defined.js';

export const Rating: Widgets['Rating'] = (options) =>
	html`<!--  -->
		<div class="theme-webawesome widget-rating" part="widget-rating">
			<label for=${options.html.id}>${options.label}</label>

			<wa-rating
				label=${ifDefined(options.label)}
				value=${ifDefined(options.html.value)}
				precision=${
					/* NOTE: buggy typing here. Using "any" with step is fine */
					ifDefined(options.html.step)
				}
				min=${ifDefined(options.html.min)}
				max=${ifDefined(options.html.max)}
				helpText=${ifDefined(options.helpText)}
				name=${options.html.name}
				id=${options.html.id}
				?required=${options.html.required}
				@wa-input=${(event: Event) =>
					event.target?.dispatchEvent(new Event('input', { bubbles: true }))}
				@wa-change=${(event: Event) =>
					event.target?.dispatchEvent(new Event('change', { bubbles: true }))}
				?disabled=${options.html.disabled}
				?readonly=${options.html.readonly}
			></wa-rating>
		</div>`;
