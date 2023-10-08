import { JsfShoelace } from './form.js';

customElements.define('jsf-shoelace', JsfShoelace);

declare global {
	interface HTMLElementTagNameMap {
		'jsf-shoelace': JsfShoelace;
	}
}
