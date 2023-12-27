import { html } from 'lit';

import type { Widgets } from '@jsfe/types';

import type { SlColorPicker } from '@shoelace-style/shoelace';
import '@shoelace-style/shoelace/dist/components/color-picker/color-picker.js';

export const colorPicker: Widgets['colorPicker'] = (options) => html`
	<div class="theme-shoelace widget-color-picker">
		<label>${options.label}</label>
		<sl-color-picker
			.label=${options.label ?? ''}
			value=${options.value ? String(options.value) : ''}
			@sl-change=${(event: CustomEvent) => {
				const newValue = (event.target as SlColorPicker).value;

				options.valueChangedCallback?.(newValue);
			}}
			.disabled=${options.disabled}
		></sl-color-picker>

		<div class="widget-color-picker__description">${options.helpText}</div>
	</div>
`;
