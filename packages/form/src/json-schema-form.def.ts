import { Jsf } from './json-schema-form.js';

customElements.define('json-schema-form', Jsf);

declare global {
	interface HTMLElementTagNameMap {
		'json-schema-form': Jsf;
	}
}
