import { defineRoute } from '@gracile/gracile/route';
import { html } from '@gracile/gracile/server-html';

import { document } from '../document.js';

export default defineRoute({
	document: (context) =>
		document({
			...context,
			title: 'Generics',
			webawesome: false,
		}),

	template: (context) => {
		return html`Nothing`;
		// return html`
		// 	<div>
		// 		<is-land load="GenericsReact"></is-land>
		// 		<p id="react-canary-note">
		// 			A React route is canary-only for host/hydration infra. Generics React
		// 			renderer parity is tracked separately.
		// 		</p>
		// 	</div>
		// `;
	},
});
