import { html } from 'lit';

import type { Widgets } from '@jsfe/types';

import type { SlSelect, SlSelectEvent } from '@shoelace-style/shoelace';
import '@shoelace-style/shoelace/dist/components/select/select.js';

export const selectMultiple: Widgets['selectMultiple'] = (options) => html`
	<sl-select
		class="theme-shoelace widget-select-multi level-${options.level}"
		part="widget-select-multi"
		.id=${options.id}
		.label=${options.label ?? ''}
		.value=${options.value}
		multiple
		clearable
		.disabled=${options.disabled}
		.helpText=${options.helpText ?? ''}
		@sl-change=${(event: SlSelectEvent) => {
			const { value } = event.target as SlSelect;

			options.valueChangedCallback?.(value);
		}}
	>
		${options?.enum?.map((enumValue) => {
			return html`<sl-option value=${enumValue}>${enumValue}</sl-option>`;
		})}
	</sl-select>
`;
