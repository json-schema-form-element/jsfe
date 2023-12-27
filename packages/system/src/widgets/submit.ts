import { html } from 'lit';

import type { Widgets } from '@jsfe/types';

export const submit: Widgets['submit'] = (options) => html`
	<!--  -->
	<div id=${options.id} class="theme-system widget-submit">
		<button type="submit">${options.label ?? 'Submit'}</button>
	</div>
`;
