import type { Widgets } from '@jsfe/engine';

import { html } from '@lit-labs/signals';

export const Switchh: Widgets['Switch'] = (options) => html`
	<wa-switch
		?checked=${typeof options.html.checked === 'boolean'
			? options.html.checked
			: false}
		?disabled=${options.html.disabled}
		?required=${options.html.required}
		id=${options.html.id}
		name=${options.html.id}
		>${options.label}
		${options.helpText
			? html`<small> -&nbsp;${options.helpText}</small>`
			: null}
	</wa-switch>
`;
