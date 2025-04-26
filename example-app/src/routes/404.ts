import { defineRoute } from '@gracile/gracile/route';
import { html } from '@gracile/gracile/server-html';

import { document } from '../document.js';

export default defineRoute({
	document: (context) => document({ ...context, title: 'Gracile - 404' }),

	template: (context) => html`
		<h1>⚠️ 404 !!</h1>

		<p><code>${context.url.toString()}</code> not found.</p>
	`,
});
