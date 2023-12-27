/* eslint-disable arrow-body-style */
import { html, nothing } from 'lit';

import type { Widgets } from '@jsfe/types';

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
				? html`<p class="widget-object__description">${options.helpText}</p>`
				: nothing}
			<!--  -->
			${options.children}
		</fieldset>
	`;
};
