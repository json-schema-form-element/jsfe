import type { Widgets } from '@jsfe/engine';

import { html } from '@lit-labs/signals';

export const Checkbox: Widgets['Checkbox'] = (options) => html`
	<div class="theme-webawesome widget-checkbox">
		<wa-checkbox
			type="text"
			?checked=${options.html.value}
			name=${options.html.name}
			id=${options.html.id}
			?required=${options.html.required ?? true}
			?disabled=${options.html.disabled}
			>${options.label}
		</wa-checkbox>

		${options.helpText
			? html`<div class="widget-checkbox__description">
					${options.helpText}
				</div>`
			: null}
	</div>
`;
