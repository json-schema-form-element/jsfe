import { defineRoute } from '@gracile/gracile/route';
import { html } from '@gracile/gracile/server-html';

import { document } from '../document.js';

// import '@jsfe/webawesome';
import './test-1.client.js';
import { schema, data, ui } from '../fixtures/all-features.js';

export default defineRoute({
	handler: {
		GET: ({ url, locals }) => {
			return {
				// ...locals,
				query: url.searchParams.get('filter') || '…empty…',
			};
		},
	},

	document: (context) =>
		document({ ...context, title: 'Gracile - Home', webawesome: false }),

	template: (context) => html`
		<h1>
			<img src="/favicon.svg" height="32" width="32" /> - Generic form - SSR +
			Hybrid native/JS submission
		</h1>

		<h2>${new URL(context.url.pathname, context.url)}</h2>

		${context.url.searchParams.size
			? html` <div id="form-result">
					FORM RESULT:
					<pre>${JSON.stringify([...context.url.searchParams], null, 2)}</pre>
				</div>`
			: null}

		<dl>
			<dt>jsf-generic</dt>
			<dd>
				<jsf-generic
					schema=${JSON.stringify(schema)}
					ui=${JSON.stringify(ui)}
					data=${JSON.stringify(data)}
				></jsf-generic>
			</dd>
		</dl>
	`,
});
