import type { Widgets } from '@j_c/jsfe__types';
import { nothing, html } from 'lit';

import 'wired-elements/lib/wired-card.js';

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
