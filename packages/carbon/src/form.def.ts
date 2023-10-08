import { JsfCarbon } from './form.js';

customElements.define('jsf-carbon', JsfCarbon);

declare global {
	interface HTMLElementTagNameMap {
		'jsf-carbon': JsfCarbon;
	}
}
