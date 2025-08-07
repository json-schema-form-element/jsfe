import type { Widgets } from '@jsfe/engine';

import { html } from '@lit-labs/signals';

export const SelectMultiple: Widgets['SelectMultiple'] = (options) => html`
	<sl-select
		class="theme-shoelace widget-select-multi level-${options.level}"
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
			return html`<sl-option value=${enumValue}>${enumValue}</sl-option>`;
		})}
	</sl-select>
`;

// @sl-change=${(event: SlSelectEvent) => {
//   const { value } = event.target as SlSelect;

//   options.valueChangedCallback?.(value);
// }}
