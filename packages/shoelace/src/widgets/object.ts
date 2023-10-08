import { nothing, html } from 'lit';

import type { Widgets } from '@j_c/jsfe__types';

export const object: Widgets['object'] = (options) => html`
	<fieldset id=${options.id} class="theme-shoelace widget-object" part="object">
		<!--  -->
		${options.label ? html`<legend>${options.label}</legend>` : ``}
		<!-- -->
		${options.helpText
			? html`<div class="widget-color-picker__description">
					${options.helpText}
			  </div>`
			: nothing}
		<!--  -->
		${options.children}
	</fieldset>
`;
