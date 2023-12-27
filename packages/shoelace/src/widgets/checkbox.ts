import { html, nothing } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';

import type { Widgets } from '@jsfe/types';

import type { SlCheckbox } from '@shoelace-style/shoelace';
import '@shoelace-style/shoelace/dist/components/input/input.js';

export const checkbox: Widgets['checkbox'] = (options) => html`
	<div class="theme-shoelace widget-checkbox">
		<sl-checkbox
			type="text"
			.checked="${options.value}"
			.name=${options.id}
			.id=${options.id}
			.required=${options.required ?? true}
			@sl-input=${(event: Event) => {
				const { checked: newValue } = event.target as SlCheckbox;
				options.valueChangedCallback?.(newValue);
			}}
			.disabled=${options.disabled}
		>
			<label class="widget-checkbox__label">${options.label}</label>
		</sl-checkbox>

		${options.helpText
			? html`<div class="widget-checkbox__description">
					${options.helpText}
			  </div>`
			: nothing}
	</div>
`;
