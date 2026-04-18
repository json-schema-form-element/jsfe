import type { Widgets } from '@jsfe/engine';

import { html } from '@lit-labs/signals';

export const SelectMultiple: Widgets['SelectMultiple'] = (options) => html`
	<wa-select
		class="theme-webawesome widget-select-multi level-${options.level}"
		part="widget-select-multi"
		id=${options.html.id}
		label=${options.label ?? ''}
		value=${options.value}
		multiple
		clearable
		?disabled=${options.html.disabled}
		.helpText=${options.helpText ?? ''}
	>
		${options.enum?.map((enumValue) => {
			return html`<wa-option value=${enumValue}>${enumValue}</wa-option>`;
		})}
	</wa-select>
`;

// @sl-change=${(event: SlSelectEvent) => {
//   const { value } = event.target as SlSelect;

//   options.valueChangedCallback?.(value);
// }}
