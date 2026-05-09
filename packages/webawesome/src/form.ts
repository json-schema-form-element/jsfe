import { FormGeneric } from '@jsfe/generics/form-generic';
import { JsonSchemaFormElement } from '@jsfe/generics/jsf-element';
import { html } from '@lit-labs/signals';

import * as widgets from './widgets/index.js';

/**
 * @tagName jsf-webawesome
 */
export class JsonSchemaFormWebawesome extends JsonSchemaFormElement {
	static readonly tagName = 'jsf-webawesome';

	/** @internal */
	widgets = widgets;

	render() {
		if (!this.form) return html`No form`;

		return FormGeneric({ form: this.form, widgets: this.widgets });
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'jsf-webawesome': JsonSchemaFormWebawesome;
	}
}
