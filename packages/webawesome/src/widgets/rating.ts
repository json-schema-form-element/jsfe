import type { Widgets } from '@jsfe/engine';

import { html } from '@lit-labs/signals';
import { ifDefined } from 'lit/directives/if-defined.js';

export const Rating: Widgets['Rating'] = (options) =>
	html`<!--  -->
		<div class="theme-shoelace widget-rating" part="widget-rating">
			<label for=${options.html.id}>${options.label}</label>

			<!-- label=$ {ifDefined(options.label)} -->
			<sl-rating
				value=${ifDefined(options.value)}
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
				@sl-input=${(event: Event) =>
					event.target?.dispatchEvent(new Event('input', { bubbles: true }))}
				@sl-change=${(event: Event) =>
					event.target?.dispatchEvent(new Event('change', { bubbles: true }))}
				?disabled=${options.html.disabled}
				?readonly=${options.html.readonly}
			></sl-rating>
		</div>`;
