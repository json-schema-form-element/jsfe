import 'wired-elements/lib/wired-card.js';

import { html, nothing } from 'lit';

import type { Widgets } from '@jsfe/types';

export const object: Widgets['object'] = (options) => html`
	<fieldset
		id=${options.id}
		class="theme-wired widget-object"
		part="widget-object"
	>
		${options.label ? html`<legend>${options.label}</legend>` : nothing}
		<!-- -->
		${options.helpText
			? html`<p class="widget-object__description">${options.helpText}</p>`
			: nothing}
		<wired-card elevation="2">
			<div class="widget-object__field">
				<!-- -->
				${options.children}
			</div>
		</wired-card>
	</fieldset>
`;
