import { html, nothing } from 'lit';

import type { Widgets } from '@jsfe/types';

export const object: Widgets['object'] = (options) => html`
	<fieldset
		id=${options.id}
		class="theme-shoelace widget-object widget-fieldset level-${options.level}"
		part="object"
	>
		${options.label ? html`<legend>${options.label}</legend>` : ``}
		<!-- -->
		${options.helpText
			? html`<div class="widget-fieldset__description">
					${options.helpText}
			  </div>`
			: nothing}
		<!--  -->
		${options.children}
	</fieldset>
`;
