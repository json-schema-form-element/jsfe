import { defineRoute } from '@gracile/gracile/route';
import { html } from '@gracile/gracile/server-html';

import { document } from '../document.js';

export default defineRoute({
	handler: {
		GET: ({ url, locals }) => {
			return {
				...locals,
				query: url.searchParams.get('filter') || '…empty…',
			};
		},
	},

	document: (context) => document({ ...context, title: 'Gracile - Home' }),

	template: (context) => html`
		<h1><img src="/favicon.svg" height="25" /> - Hello Gracile</h1>

		<h2>${context.url}</h2>

		<dl>
			<dt>Gracile</dt>
			<dd>
				<a href="https://gracile.js.org" target="_blank">Documentation</a>
			</dd>

			<dt>Query (<code>?filter</code>):</dt>
			<dd>
				<code>${context.props.GET.query}</code>
			</dd>

			<dt>User email:</dt>
			<dd>
				<code>${context.props.GET.userEmail}</code>
			</dd>

			<dt>Request ID:</dt>
			<dd>
				<code>${context.props.GET.requestId}</code>
			</dd>

			<dt>JSON API</dt>
			<dd><a href="/api/">GET</a></dd>

			<dt>Custom Element</dt>
			<dd><my-greetings></my-greetings></dd>

			<dt>Prerendered page</dt>
			<dd><a href="/about/">About page</a></dd>
		</dl>
	`,
});
