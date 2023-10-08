import { JsfMaterial } from './form.js';

customElements.define('jsf-material', JsfMaterial);

declare global {
	interface HTMLElementTagNameMap {
		'jsf-material': JsfMaterial;
	}
}
