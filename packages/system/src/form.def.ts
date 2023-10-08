import { JsfSystem } from './form.js';

customElements.define('jsf-system', JsfSystem);

declare global {
	interface HTMLElementTagNameMap {
		'jsf-system': JsfSystem;
	}
}
