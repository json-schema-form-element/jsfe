import { html } from 'lit';

import type { Widgets } from '@jsfe/types';

import '@material/web/button/filled-button.js';

export const submit: Widgets['submit'] = (options) => html`
	<!--  -->
	<div id=${options.id} class="theme-material widget-submit">
		<md-filled-button type="submit"
			>${options.submitButtonText ?? 'Submit'}</md-filled-button
		>
	</div>
`;
