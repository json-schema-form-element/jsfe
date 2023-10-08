import { JsfWired } from './form.js';

customElements.define('jsf-wired', JsfWired);

declare global {
	interface HTMLElementTagNameMap {
		'jsf-wired': JsfWired;
	}
}
