import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';

import type { Widgets } from '@jsfe/types';

import '@shoelace-style/shoelace/dist/components/select/select.js';
import '@shoelace-style/shoelace/dist/components/option/option.js';
import type { SlSelect } from '@shoelace-style/shoelace';

// .label=${options.label}
// .helpText=${options.helpText}
export const select: Widgets['select'] = (options) => html`
	<sl-select
		value=${ifDefined(options.value)}
		.required=${options.required}
		@sl-change=${(event: Event) => {
			let newValue: string | null | number | string[] = (
				event.target as SlSelect
			).value;
			if (Array.isArray(newValue)) return;
			if (options.type === 'number' || options.type === 'integer') {
				newValue = Number(newValue);
			}
			options.valueChangedCallback?.(newValue);
		}}
		>${options.enum?.map(
			(enumValue) =>
				html` <sl-option .value=${String(enumValue)}>
					${enumValue}
				</sl-option>`,
		)}</sl-select
	>
`;
