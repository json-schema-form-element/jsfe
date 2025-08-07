import { html } from '@lit-labs/signals';

import type { Widgets } from '@jsfe/engine';

// import '@shoelace-style/shoelace/dist/components/button/button.js';

export const Submit: Widgets['submit'] = (options) => html`
	<!--  -->
	<div id=${options.id} class="theme-shoelace widget-submit">
		<sl-button type="submit" size="large"
			>${options.label ?? 'Submit'}</sl-button
		>
	</div>
`;
