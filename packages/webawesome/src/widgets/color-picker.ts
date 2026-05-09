import type { Widgets } from '@jsfe/engine';

import { html } from '@lit-labs/signals';
import { ifDefined } from 'lit/directives/if-defined.js';

export const ColorPicker: Widgets['ColorPicker'] = (options) => html`
	<div class="theme-webawesome widget-color-picker">
		<label for=${options.html.id}>${options.label}</label>
		<wa-color-picker
			label=${ifDefined(options.label)}
			value=${options.html.value ?? ''}
			name=${options.html.name}
			id=${options.html.id}
			?disabled=${options.html.disabled}
			@wa-input=${(event: Event) =>
				event.target?.dispatchEvent(new Event('input', { bubbles: true }))}
			@wa-change=${(event: Event) =>
				event.target?.dispatchEvent(new Event('change', { bubbles: true }))}
		></wa-color-picker>

		<div class="widget-color-picker__description">${options.helpText}</div>
	</div>
`;
