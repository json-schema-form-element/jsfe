import { defineRoute } from '@gracile/gracile/route';
import { html } from '@gracile/gracile/server-html';

import { document } from '../document.js';

export default defineRoute({
	prerender: true,

	document: (context) => document({ ...context, title: 'Gracile - About' }),

	template: () => html`
		<h1>About</h1>

		<article>
			Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolorum enim ex
			iste! Porro quibusdam dolorem incidunt, quis inventore tempore earum
			voluptatibus ab, labore dignissimos rerum numquam tempora excepturi
			reprehenderit cupiditate.
		</article>
	`,
});
