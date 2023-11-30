import { html } from 'lit';

import type { Widgets } from '@jsfe/types';

import '@spectrum-web-components/button/sp-button.js';

export const submit: Widgets['submit'] = (options) => html`
	<!--  -->
	<div id=${options.id} class="theme-spectrum widget-submit">
		<sp-button type="submit" size="large">Submit</sp-button>
	</div>
`;
