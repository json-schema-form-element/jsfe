/* eslint-disable arrow-body-style */
import type { Widgets } from '@jsfe/types';
import { nothing, html } from 'lit';
import '@material/web/elevation/elevation.js';

export const object: Widgets['object'] = (options) => {
	return html`
		<fieldset
			id=${options.id}
			class="theme-material widget-object widget-fieldset"
			part="object"
		>
			<md-elevation></md-elevation>
			<!--  -->
			${options.label ? html`<legend>${options.label}</legend>` : nothing}
			<!-- -->
			${options.helpText
				? html`<p class="object__description">${options.helpText}</p>`
				: nothing}
			<!--  -->
			${options.children}
		</fieldset>
	`;
};
