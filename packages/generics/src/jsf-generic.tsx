'use html-signal';

import { FormGeneric } from './form-generic.js';
import { log } from './form.helpers.js';
import { JsonSchemaFormElement } from './jsf-element.js';
import * as genericWidgets from './widgets/index.js';

/**
 * Generic implementation of the JSON Schema Form element
 *
 * @tagName jsf-generic
 */
export class JsonSchemaFormGeneric extends JsonSchemaFormElement {
	public static readonly tagName = 'jsf-generic';

	public widgets = genericWidgets;

	protected override render(): unknown {
		if (!this.form) {
			const message = 'Missing form instance';
			log.error(message);
			return this.debug ? message : '';
		}

		return <FormGeneric debug={this.debug} form={this.form} />;
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'jsf-generic': JsonSchemaFormGeneric;
	}
}
