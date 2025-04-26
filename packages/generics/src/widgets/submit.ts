import type { Widgets } from '@jsfe/engine';

import { html } from '@lit-labs/signals';

export const Submit: Widgets['Submit'] = () =>
	/* TODO: */
	/* options: {} */

	html`
		<!--  -->
		<div
			id=${/* TODO: */ /* options.id */ ''}
			class="theme-system widget-submit"
		>
			<button type="submit">
				${/* TODO: */ /* options.label ?? */ 'Submit'}
			</button>
		</div>
	`;
