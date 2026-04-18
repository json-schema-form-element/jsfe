import type { Widgets } from '@jsfe/engine';

import { html } from '@lit-labs/signals';
import { ifDefined } from 'lit/directives/if-defined.js';

export const ColorPicker: Widgets['ColorPicker'] = (options) => html`
	<div class="theme-shoelace widget-color-picker">
		<label for=${options.html.id}>${options.label}</label>
		<sl-color-picker
			label=${ifDefined(options.label)}
			value=${options.html.value ? String(options.html.value) : ''}
			name=${options.html.name}
			id=${options.html.id}
			?disabled=${options.html.disabled}
			@sl-input=${(event: Event) =>
				event.target?.dispatchEvent(new Event('input', { bubbles: true }))}
			@sl-change=${(event: Event) =>
				event.target?.dispatchEvent(new Event('change', { bubbles: true }))}
		></sl-color-picker>

		<div class="widget-color-picker__description">${options.helpText}</div>
	</div>
`;
