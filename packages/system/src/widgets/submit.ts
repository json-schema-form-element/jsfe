import { html } from 'lit';

import type { Widgets } from '@j_c/jsfe__types';

export const submit: Widgets['submit'] = (options) => html`
	<!--  -->
	<div id=${options.id} class="theme-system widget-submit">
		<button type="submit">Submit</button>
	</div>
`;
