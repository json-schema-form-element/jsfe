import { html } from 'lit';

import type { Widgets } from '@jsfe/types';

import '@carbon/web-components/es/components/button/index.js';

export const submit: Widgets['submit'] = (options) => html`
	<!--  -->
	<div id=${options.id} class="theme-carbon widget-submit">
		<cds-button type="submit" isExpressive size="lg"
			>${options.label ?? 'Submit'}</cds-button
		>
	</div>
`;
