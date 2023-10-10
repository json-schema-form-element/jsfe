import type { Widgets } from '@jsfe/types';
import { nothing, html } from 'lit';

export const object: Widgets['object'] = (options) => html`
	<fieldset
		id=${options.id}
		class="theme-system widget-object"
		part="widget-object"
	>
		${options.label ? html`<legend>${options.label}</legend>` : nothing}
		<!-- -->
		${options.helpText
			? html`<p class="widget-object__description">${options.helpText}</p>`
			: nothing}
		<!--  -->
		${options.children}
	</fieldset>
`;
