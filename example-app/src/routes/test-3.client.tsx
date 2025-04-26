import { createRoot } from 'react-dom/client';
import { App } from '../fixtures/react-app.js';

customElements.define(
	'react-app',
	class ReactApp extends HTMLElement {
		constructor() {
			super();
			createRoot(this).render(<App />);
		}
	},
);
