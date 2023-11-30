import { JsfSpectrum } from './form.js';

customElements.define('jsf-spectrum', JsfSpectrum);

declare global {
	interface HTMLElementTagNameMap {
		'jsf-spectrum': JsfSpectrum;
	}
}
