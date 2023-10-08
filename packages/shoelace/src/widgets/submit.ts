import { html } from 'lit';

import type { Widgets } from '@j_c/jsfe__types';

import '@shoelace-style/shoelace/dist/components/button/button.js';

export const submit: Widgets['submit'] = (options) => html`
	<!--  -->
	<div id=${options.id} class="theme-shoelace widget-submit">
		<sl-button type="submit" size="large">Submit</sl-button>
	</div>
`;
