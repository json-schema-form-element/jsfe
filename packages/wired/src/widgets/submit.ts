import 'wired-elements/lib/wired-button.js';

import { html } from 'lit';

import type { Widgets } from '@jsfe/types';

export const submit: Widgets['submit'] = (options) => html`
	<!--  -->
	<div id=${options.id} class="theme-wired widget-submit">
		<wired-button
			type="submit"
			elevation="5"
			@click=${(event: Event) =>
				// FIXME: !!!
				event.target?.dispatchEvent(new Event('submit', { bubbles: true }))}
			>${options.label ?? 'Submit'}</wired-button
		>
	</div>
`;
