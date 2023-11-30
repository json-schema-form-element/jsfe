import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';

import type { Widgets } from '@jsfe/types';

import { field } from './_field.js';

export const select: Widgets['select'] = (options) => html`
	${field(
		options,
		html`<select
			value=${ifDefined(options.value)}
			?required=${options.required}
			.label=${options.label}
			@input=${(event: Event) => {
				let newValue: string | null | number | string[] = (
					event.target as HTMLSelectElement
				).value;
				if (Array.isArray(newValue)) return;
				if (options.type === 'number' || options.type === 'integer') {
					newValue = Number(newValue);
				}
				options.valueChangedCallback?.(newValue);
			}}
		>
			${options.enum?.map(
				(enumValue, i) =>
					html`<option .value=${String(enumValue)}>${enumValue}</option>`,
			)}
		</select>`,
	)}
`;
